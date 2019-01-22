'use strict';
import Mongodb from '../../database/mongo/mongodb';
import {IDeviceInfor} from './device-infor';
import {Collection} from 'mongodb';
import Config from '../../commons/config';

const mongoDb = Mongodb.getInstace();

export interface DeviceInfor {
    browser: string;
    device: string;
    heightScreen: number;
    os: string;
    widthScreen: number;
}

class DeviceInforModel implements IDeviceInfor {
    collection: Collection;
    COLLECTION_NAME = 'device_tracking';

    constructor() {
        this.connectDb();
    }

    async connectDb() {
        const db = await mongoDb.connect();
        return db.db().collection(this.COLLECTION_NAME);
    }

    async getInfors(query?: any) {
        try {
            this.collection = await this.connectDb();
            // const result = this.collection.find(query).limit(Config.LIMIT).toArray() ? query :
            //     this.collection.find().limit(Config.LIMIT).toArray();
            const result = this.collection.find(query).limit(Config.LIMIT).toArray();
            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async getInforInstance(query: any) {
        try {
            this.collection = await this.connectDb();
            return await this.collection.findOne(query);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async createInfor(doc: any) {
        try {
            this.collection = await this.connectDb();
            return await this.collection.insertOne(doc);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async updateTimeExitPage(uuid: string, doc: any) {
        try {
            this.collection = await this.connectDb();
            return await this.collection.findOneAndUpdate(uuid, doc);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default DeviceInforModel;
