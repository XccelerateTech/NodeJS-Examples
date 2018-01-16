
module.exports = class ProjectService{

    constructor(knex){
        this.table = "projects";
        this.knex = knex;
    }

    knex(){
        return this.knex(this.table)
    }
    
}