
const PROJECTS = require('./tables').PROJECTS;

module.exports = class ProjectService{

    constructor(knex){
        this.knex = knex;
    }

    create(project){
        // Validation logic
        return this.knex.insert(project)
                    .into(PROJECTS)
                    .returning("id");
    }


    delete(projectId){
        return this.knex(PROJECTS)
                    .where("id",projectId)
                    .del();
    }


    list(limit=100,offset=0){
        return this.knex.select("*")
                    .from(PROJECTS)
                    .limit(limit).offset(offset);
    }

    update(id,project){
        return this.knex(PROJECTS)
                    .update(project)
                    .where("id",id);
    }

    search(searchCriteria,limit=100,offset=0){
        return this.knex.select("*").from(PROJECTS)
                    .where(searchCriteria)
                    .limit(100).offset(0);
    }
}