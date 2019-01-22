import * as express from 'express';
import DeviceInforRoute from '../components/device-infor/device-infor.route';
const app = express();

class AppRoutes {
    constructor() {
    }

    get routes() {
        app.use('/device-infor', DeviceInforRoute);
        return app;
    }
}

export default new AppRoutes().routes;
