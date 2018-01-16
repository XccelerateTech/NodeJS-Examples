const express = require("express");


class ProjectRouter{

    constructor(projectService){
        this.projectService = projectService;
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
        this.projectService.list().then((data)=>{
            res.json(data);
        });
    }

    post(req,res){
        this.projectService.create(req.body).then((data)=>{
            res.json(data);
        });
    }

    put(req,res){
        this.projectService.update(req.params.id,req.body).then((data)=>{
            res.json(data);
        })
    }

    delete(req,res){
        this.projectService.delete(req.params.id).then((data)=>{
            res.json(data);
        });
    }
}

module.exports = ProjectRouter

