

module.exports = class GroupService{

    constructor(knex){
        this.table = "groups";
        this.knex = knex;
    }

    knex(){
        return this.knex(this.table)
    }
    
}