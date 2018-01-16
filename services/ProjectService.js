
const PROJECTS = require('./tables').PROJECTS;

module.exports = class ProjectService{

    constructor(knex){
        this.knex = knex;
    }

    create(group){
        // Validation logic
        return this.knex()
                    .insert(group)
                    .into(PROJECTS)
                    .returning("id");
    }


    delete(groupId){
        return this.knex(PROJECTS)
                    .where("id",groupId)
                    .del();
    }


    list(limit=100,offset=0){
        return this.knex()
                    .select("*")
                    .from(PROJECTS)
                    .limit(limit).offset(offset);
    }

    update(id,group){
        return this.knex(PROJECTS)
                    .update(group)
                    .where("id",id);
    }

    search(searchCriteria,limit=100,offset=0){
        return this.knex()
                    .select("*").from(PROJECTS)
                    .where(searchCriteria)
                    .limit(100).offset(0);
    }
}