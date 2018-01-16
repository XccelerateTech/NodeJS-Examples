const express = require('express')

module.exports = class ViewRouter{
    
    router(){
        const router = express.Router();
        router.get('/users',(req,res)=>res.render("users"));
        router.get('/groups',(req,res)=>res.render("groups"));
        router.get('/projects',(req,res)=>res.render("projects"));
        return router;
    }

}