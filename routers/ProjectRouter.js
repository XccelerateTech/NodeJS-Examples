const express = require("express");


class ProjectRouter{

    constructor(){

    }

    router(){
        let router = express.Router();
        router.get("/",this.get.bind(this));
        router.post("/",this.post.bind(this));
        router.put("/:id",this.put.bind(this));
        router.patch("/:id",this.patch.bind(this));
        router.delete("/:id",this.delete.bind(this));
        return router;
    }

    get(req,res){

    }

    post(req,res){

    }

    put(req,res){

    }

    delete(req,res){

    }
}

module.exports = ProjectRouter

