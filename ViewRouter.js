const express = require('express')

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/',(req,res)=>res.render("index"));
        router.get('/users',(req,res)=>res.render("users"));
        router.get('/groups',(req,res)=>res.render("groups"));
        return router;
    }

}