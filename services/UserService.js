
module.exports = class UserService{

    constructor(knex){
        this.table ="users"; 
        this.knex = knex;
    }

    knex(){
        return this.knex(this.table);
    }
}