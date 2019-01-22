import * as express from 'express';
// import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import AppRoutes from './routers/routes';

class App {

    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/api', AppRoutes);
    }
}

export default new App().express;
