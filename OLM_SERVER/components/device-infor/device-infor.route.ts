import * as express from 'express';
import DeviceInforController from './device-infor.controller';

const router = express.Router();

class DeviceInforRoute {

    constructor() {
    }

    get routes() {
        const controller = DeviceInforController;
        router.get('/', controller.getInfors);
        router.post('/create-infor', controller.createInfor);
        router.post('/update-time-exit-page', controller.updateTimeExitPage);
        return router;
    }
}

Object.seal(DeviceInforRoute);
export default new DeviceInforRoute().routes;
