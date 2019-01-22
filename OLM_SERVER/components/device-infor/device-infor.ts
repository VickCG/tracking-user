'use strict';

export interface IDeviceInfor {
    connectDb(): Promise<any>;
    getInfors(query?: any): Promise<any>;
    getInforInstance(query: any): Promise<any>;
    createInfor(doc: any): any;
    updateTimeExitPage(uuid: string, time: any): Promise<any>;
}