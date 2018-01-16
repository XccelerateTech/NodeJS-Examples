

const USERS = require("./tables").USERS;

module.exports = class UserService{

    constructor(knex){
        this.knex = knex;
    }

    create(user){
        // Validation logic
        return this.knex.insert(user).into(USERS).returning("id");
    }


    delete(userId){
        return this.knex(USERS).where("id",userId).del();
    }


    list(limit=100,offset=0){
        return this.knex.select("*")
                    .from(USERS)
                    .limit(limit).offset(offset);
    }

    update(id,user){
        return this.knex(USERS)
                    .update(user)
                    .where("id",id);
    }

    search(searchCriteria,limit=100,offset=0){
        return this.knex.select("*").from(USERS)
                    .where(searchCriteria)
                    .limit(limit).offset(offset);
    }
}