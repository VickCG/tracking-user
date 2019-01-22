'use strict';
import DeviceInforModel from './device-infor.model';
import * as express from 'express';

class DeviceInforController {
    deviceInforModel = new DeviceInforModel();

    constructor() {
        this.getInfors = this.getInfors.bind(this);
        this.createInfor = this.createInfor.bind(this);
        this.updateTimeExitPage = this.updateTimeExitPage.bind(this);
    }

    async getInfors(req: express.Request, res: express.Response) {
        const result = await this.deviceInforModel.getInfors();
        return res.json(result);
    }

    // private async getInforInstance(req: express.Request, res: express.Response) {
    //     return await this.deviceInforModel.getInforInstance(req);
    // }

    async createInfor(req: express.Request, res: express.Response) {
        const result = await this.deviceInforModel.createInfor(req);
        return res.json(result);
    }

    async updateTimeExitPage(req: express.Request, res: express.Response) {
        const result = await this.deviceInforModel.updateTimeExitPage(req.body['uuid'], req.body['timeExit']);
        return res.json(result);
    }
}

export default new DeviceInforController();
