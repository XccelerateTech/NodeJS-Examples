const express = require("express");


class GroupRouter{

    constructor(groupService){
        this.groupService = groupService;
    }

    router(){
        let router = express.Router();
        router.get("/",this.get.bind(this));
        router.post("/",this.post.bind(this));
        router.put("/:id",this.put.bind(this));
        router.patch("/:id",this.put.bind(this));
        router.delete("/:id",this.delete.bind(this));
        return router;
    }

    get(req,res){
        this.groupService.list().then((data)=>{
            res.json(data);
        });
    }

    post(req,res){
        this.groupService.create(req.body).then((data)=>{
            res.json(data);
        });
    }

    put(req,res){
        this.groupService.update(req.params.id,req.body).then((data)=>{
            res.json(data);
        })
    }

    delete(req,res){
        this.groupService.delete(req.params.id).then((data)=>{
            res.json(data);
        });
    }
}

module.exports = GroupRouter

