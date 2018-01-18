const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const socketIOSession = require("socket.io.session");


module.exports = class SessionService{

    constructor(redisService){
        const sessionStore = new RedisStore({
            client: redisService.client,
            unset: "destroy"
        });
        this.settings = {
            store: sessionStore,
            secret: "supersecret",
            cookie: { "path": '/', "httpOnly": true, "secure": false,  "maxAge": null }
        }
    }

    express(){
        return expressSession(this.settings);
    }

    socketIO(){
        return socketIOSession(this.settings).parser;
    }
}