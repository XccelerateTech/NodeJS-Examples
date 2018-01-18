
const redis = require('redis');

module.exports = class RedisService{

    constructor(host,port){
        this.host = host;
        this.port = port;
    }

    client(){
        return redis.createClient({
            host: this.host,
            port: this.port
        })
    }
}
