

const USERS = require("./tables").USERS;

module.exports = class UserService{

    constructor(knex){
        this.knex = knex;
    }

    create(group){
        // Validation logic
        return this.knex().insert(group).into(USERS).returning("id");
    }


    delete(groupId){
        return this.knex(USERS).where("id",groupId).del();
    }


    list(limit=100,offset=0){
        return this.knex()
                    .select("*")
                    .from(USERS)
                    .limit(limit).offset(offset);
    }

    update(id,group){
        return this.knex(USERS)
                    .update(group)
                    .where("id",id);
    }

    search(searchCriteria,limit=100,offset=0){
        return this.knex()
                    .select("*").from(USERS)
                    .where(searchCriteria)
                    .limit(limit).offset(offset);
    }
}