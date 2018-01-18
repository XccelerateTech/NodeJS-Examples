const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

module.exports = class PassportService{

    
    constructor(app){
        app.use(passport.initialize());
        app.use(passport.session());

        passport.serializeUser((user,done)=>{
            done(null,user);
        });

        passport.deserializeUser((user,done)=>{
            done(null,user);
        });
    }
}