
const express = require('express');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const expressSession = require('express-session');
const RedisStore = require('connect-redis')(expressSession);
const socketIOSession = require("socket.io.session");
require('dotenv').config();


class App{

    constructor(redisService){
        this.redisService = redisService;
    }

    init(){
        initServer();
        initSessions();
        initPassport();
        return this;
    }

    initServer(){
        this.expressApp = express();
        let app = this.expressApp;
        this.server = require('http').Server(app);
        this.io = require('socket.io')(this.server);
        app.engine('handlebars', hb({ defaultLayout: 'main' }));
        app.set('view engine', 'handlebars');
        app.use(express.static("public"));
        app.use(bodyParser.json());
    }

    initSessions(){
        const sessionStore = new RedisStore({
            client: this.redisService.client,
            unset: "destroy"
        });
        const settings = {
            store: sessionStore,
            secret: "supersecret",
            cookie: { "path": '/', "httpOnly": true, "secure": false,  "maxAge": null }
        }
        this.expressApp.use(expressSession(settings));
        this.io.use(socketIOSession(settings).parser);
    }

    initPassport(){
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser((user,done)=>{
            done(null,user);
        });

        passport.deserializeUser((user,done)=>{
            done(null,user);
        });

        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: `/auth/facebook/callback`
        },(accessToken, refreshToken, profile, cb)=>{
                return cb(null,{profile:profile,accessToken:accessToken});
            }
        ));
    }
    start(){
        this.server.listen(8080,()=>{
            console.log("Application started at port:8080");
        });
    }
}

module.exports = App;