const bodyParser = require('body-parser');
const hb = require('express-handlebars');
const passport = require('passport')
const express = require('express');
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
}