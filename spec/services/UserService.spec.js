const {UserService} = require('../../services');
const knexFile = require('../../knexfile')['testing'];
const knex = require('knex')(knexFile);

describe("UserService ",()=>{

    let redisClient;
    let userService;
    let example = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@gmail.com"
    }
    beforeEach((done)=>{
        userService = new UserService(knex,redisClient);
        knex('users').del().then(()=>done());
    });

    it("should support create method",(done)=>{
        userService.create(example)
        .then(()=>userService.list())
        .then((data)=>{
            expect(data.length).toEqual(1);
            expect(data[0].first_name).toEqual("John");
            done();
        });
    });

    it("should support delete method",(done)=>{
        userService.create(example)
        .then((ids)=>userService.delete(ids[0]))
        .then(()=>userService.list())
        .then((data)=>{
            expect(data.length).toEqual(0);
            done();
        });
    });

    it("should support list method",(done)=>{
        userService.create(example)
        .then(()=> userService.list())
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].first_name).toEqual("John");
            done();
        })
    });

    it("should support update method",(done)=>{
        userService.create(example)
        .then((ids)=> userService.update(ids[0],{first_name:"Peter"}))
        .then(()=> userService.list())
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].first_name).toEqual("Peter");
            done();
        })
    });

    it("should support search method",(done)=>{
        userService.create(example)
        .then(()=> userService.search({first_name:"John",last_name:"Doe"}))
        .then((data)=>{
            expect(data.length).toEqual(1)
            expect(data[0].first_name).toEqual("John");
            done();
        })
    });

});