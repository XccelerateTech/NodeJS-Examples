const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const socketIOSession = require("socket.io.session");

module.exports = (app,io,redisService)=>{
    const sessionStore = new RedisStore({
        client: redisService.client,
        unset: "destroy"
    });
    const settings = {
        store: sessionStore,
        secret: "supersecret",
        cookie: { "path": '/', "httpOnly": true, "secure": false,  "maxAge": null }
    }
    app.use(expressSession(settings));
    io.use(socketIOSession(settings).parser);
}