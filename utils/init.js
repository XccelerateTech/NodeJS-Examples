const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const passport = require('passport')
const express = require('express');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

module.exports = (app)=>{
    app.engine('handlebars', hb({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
    app.use(express.static("public"));
    app.use(bodyParser.json());


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
        callbackURL: `http://${process.env.CALLBACK_HOSTNAME}/auth/facebook/callback`
      },
      (accessToken, refreshToken, profile, cb)=>{
        return cb(null,{profile:profile,accessToken:accessToken});
      }
    ));
}