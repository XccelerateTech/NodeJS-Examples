const GroupRouter = require('../../routers/GroupRouter')

describe('GroupRouter ',()=>{
    let groupRouter ;
    let groupService;
    let req;
    let res;

    beforeEach(()=>{
        groupService = jasmine.createSpy();
        groupRouter = new GroupRouter(groupService);
        req = jasmine.createSpy();
        res = jasmine.createSpy();
    });

    it(" should support get method",()=>{
        groupRouter.get(req,res)
    });

    it(" should support post method",()=>{
        groupRouter.post(req,res);
    });

    it(" should support put method",()=>{
        groupRouter.put(req,res);
    });

    it(" should support delete method",()=>{
        groupRouter.delete(req,res);
    });
})