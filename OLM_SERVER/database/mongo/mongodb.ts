'use strict';
import {MongoClient} from 'mongodb';
const dotenv = require('dotenv');
dotenv.config();

class Mongodb {
    private static _instance: Mongodb;

    options = {
        useNewUrlParser: true,
        reconnectTries: 5000,
        bufferMaxEntries: 0
    };
    constructor() {
    }

    public static getInstace() {
        return this._instance || (this._instance = new this());
    }

    async connect() {
        try {
            return await MongoClient.connect(process.env.DB_MONGO, this.options);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

export default Mongodb;
