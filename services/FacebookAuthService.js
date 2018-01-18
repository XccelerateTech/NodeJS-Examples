const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

module.exports = class FacebookAuthService{

    constructor(){
        passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/auth/facebook/callback"
          },
          function(accessToken, refreshToken, profile, cb) {
            return cb(null,{profile:profile,accessToken:accessToken});
          }
        ));
    }

    auth(){
        return passport.authenticate('facebook',{
            scope: ['user_friends', 'manage_pages'] 
        });
    }

    callback(failureRedirect){
        return passport.authenticate('facebook',{
            failureRedirect: failureRedirect
        });
    }
}
