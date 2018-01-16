

const GROUPS = require("./tables").GROUPS;

module.exports = class GroupService{

    constructor(knex){
        this.knex = knex;
    }

    create(group){
        return this.knex.insert(group).into(GROUPS).returning("id");
    }


    delete(groupId){
        return this.knex(GROUPS).where("id",groupId).del();
    }


    list(limit=100,offset=0){
        return this.knex.select("*")
                    .from(GROUPS)
                    .limit(limit).offset(offset);
    }

    update(id,group){
        return this.knex(GROUPS)
                    .update(group)
                    .where("id",id);
    }

    search(searchCriteria,limit=100,offset=0){
        return this.knex.select("*").from(GROUPS)
                    .where(searchCriteria)
                    .limit(limit).offset(offset);
    }
}