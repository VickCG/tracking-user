'use strict';
declare const $: any;
declare const moment: any;
declare const MobileDetect: any;
const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss';

const LIST_BROWSERS = [
    {name: 'Opera', value: 'opera'},
    {name: 'Chrome', value: 'chrome'},
    {name: 'Safari', value: 'safari'},
    {name: 'Firefox', value: 'firefox'},
    {name: 'IE', value: 'msie'}
];

const LIST_OS: any = {
    'Windows XP': '(Windows NT 5.1)|(Windows XP)',
    'Windows Vista': '(Windows NT 6.0)',
    'Windows 7': '(Windows NT 6.1)',
    'Windows 8': '(Windows NT 6.2)|(WOW64)',
    'Windows 10': '(Windows 10.0)|(Windows NT 10.0)',
    'Linux': '(Linux)|(X11)',
    'Mac OS': '(Mac_PowerPC)|(Macintosh)',
    'Unix': '(X11)'
};

function generateUUID() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

class Device {
    userAgent: any = navigator.userAgent;
    timeLogin = '';
    result: any = {
        ip: null,
        device: '',
        os: '',
        browser: '',
        widthScreen: null,
        heightScreen: null,
        isUtmSource: false,
        utm: {},
        uuid: null
    };

    constructor() {
        this.getInfor();
    }

    async getInfor() {
        this.detectDevice();
        this.detectSize();
        this.getTimeEnterPage();
        const ipInfor = await this.detectIP();
        this.result.ip = ipInfor.ip || null;
        this.detectUtmLink();
        this.result.uuid = this.getUUID();
        sessionStorage.setItem('uuid', this.result.uuid);
        console.log(this.result);
    }

    postInfor() {
        $.ajax({
            type: 'POST',
            data: this.result,
            url: process.env.API_URL + '/device-infor'
        });
    }

    getUUID() {
        return generateUUID() + generateUUID() + '-' +
            generateUUID() + '-' + generateUUID() + '-' +
            generateUUID() + '-' + generateUUID() + generateUUID() + generateUUID();
    }

    detectUtmLink() {
        // const urlString = 'https://www.hocmai.vn/?utm_source=facebook&utm_medium=cpc&utm_campaign=test&utm_term=term&utm_content=content&marketer=vietnq';
        const urlString = window.location.href;
        const url = new URL(urlString);
        this.result['marketer'] = url.searchParams.get('marketer') || '';
        if (url.searchParams.get('utm_source')) {
            this.result.isUtmSource = true;
            this.result.utm['utmSource'] = url.searchParams.get('utm_source') || '';
            this.result.utm['utmMedium'] = url.searchParams.get('utm_medium') || '';
            this.result.utm['utmCampaign'] = url.searchParams.get('utm_campaign') || '';
            this.result.utm['utmTerm'] = url.searchParams.get('utm_term') || '';
            this.result.utm['utmContent'] = url.searchParams.get('utm_content') || '';
        } else {
            this.result.isUtmSource = false;
        }
    }

    detectBrowser() {
        const result = [];
        for (let i = 0; i < LIST_BROWSERS.length; i++) {
            if (this.userAgent.toLowerCase().indexOf(LIST_BROWSERS[i].value) > -1) {
                result.push(LIST_BROWSERS[i].name);
            }
        }
        if (result.length > 0) {
            if (result.indexOf('Chrome') > -1 && result.indexOf('Safari') > -1) {
                this.result.browser = 'Chrome';
            } else if (result.indexOf('Chrome') > -1 && result.indexOf('Opera') > -1) {
                this.result.browser = 'Opera';
            } else {
                this.result.browser = result[0];
            }
        }
    }

    detectOS() {
        for (const key in LIST_OS) {
            if (LIST_OS.hasOwnProperty(key)) {
                if (new RegExp(LIST_OS[key]).test(this.userAgent)) {
                    this.result.os = key;
                }
            }
        }
    }

    detectDevice() {
        const md = new MobileDetect(this.userAgent);
        if (md.mobile() === null) {
            this.detectBrowser();
            this.detectOS();
            const platform: string = navigator.platform.toLowerCase();
            if (platform.indexOf('mac') > -1) {
                this.result.device = 'MAC device';
            } else if (platform.indexOf('window') > -1) {
                this.result.device = 'Window device';
            }
        } else {
            this.result.device = md.mobile();
            this.result.os = md.os();
            this.result.browser = md.userAgent();
        }
    }

    detectSize() {
        const screenSize = window.screen;
        this.result.heightScreen = screenSize.availHeight;
        this.result.widthScreen = screenSize.availWidth;
    }

    async detectIP() {
        try {
            return await $.get('https://jsonip.com/', function () {});
        } catch (err) {
            console.log(err);
        }
    }

    getTimeEnterPage() {
        this.timeLogin = moment(new Date()).format(FORMAT_DATE);
    }
}

// function when exit page
window.onbeforeunload = function () {
    const timeExitPage = moment(new Date()).format(FORMAT_DATE);
    if (sessionStorage.getItem('uuid')) {
        const req: any = {
            uuid: sessionStorage.getItem('uuid'),
            timeExit: timeExitPage
        };
        $.ajax({
            type: 'POST',
            async: false,
            data: req,
            url: process.env.API_URL + '/time-exit-page'
        });
    }
};

// excute get device infor
const device = new Device();
