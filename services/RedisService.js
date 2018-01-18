
const redis = require('redis');
require('dotenv').config();
const HOST = process.env.REDIS_HOST || 'localhost';
const PORT = process.env.REDIS_PORT || 6379

module.exports = class RedisService{

    constructor(){
        this.client = redis.createClient({
            host: HOST,
            port: PORT
        })
    }
}
