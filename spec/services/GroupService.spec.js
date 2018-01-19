const {GroupService} = require('../../services');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("GroupService ",()=>{

    let redisClient;
    let groupService;
    let example = { name: "Group1"};
    beforeEach((done)=>{
        groupService = new GroupService(knex,redisClient);
        knex('groups').del().then(()=>done());
    });

    it("should support create method",(done)=>{
        groupService.create(example)
        .then(()=>groupService.list())
        .then((data)=>{
            expect(data.length).toEqual(1);
            expect(data[0].name).toEqual("Group1");
            done();
        });
    });

    it("should support delete method",(done)=>{
        groupService.create(example)
        .then((ids)=>groupService.delete(ids[0]))
        .then(()=>groupService.list())
        .then((data)=>{
            expect(data.length).toEqual(0);
            done();
        });
    });

    it("should support list method",(done)=>{
        groupService.create(example)
        .then(()=> groupService.list())
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].name).toEqual("Group1");
            done();
        })
    });

    it("should support update method",(done)=>{
        groupService.create(example)
        .then((ids)=> groupService.update(ids[0],{name:"Group2"}))
        .then(()=> groupService.list())
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].name).toEqual("Group2");
            done();
        })
    });

    it("should support search method",(done)=>{
        groupService.create(example)
        .then(()=> groupService.search({name:"Group1"}))
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].name).toEqual("Group1");
            done();
        })
    });

});