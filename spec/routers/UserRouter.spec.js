const UserRouter = require('../../routers/UserRouter')

describe('UserRouter should',()=>{
    let userRouter ;
    let userService; 
    let req;
    let res;

    beforeEach(()=>{
        userService = jasmine.createSpy();
        userRouter = new UserRouter(userService);
        req = jasmine.createSpy();
        res = jasmine.createSpy();
    });

    it("support get method",()=>{
        userRouter.get(req,res)
    });

    it("support post method",()=>{
        userRouter.post(req,res);
    });

    it("support put method",()=>{
        userRouter.put(req,res);
    });

    it("support delete method",()=>{
        userRouter.delete(req,res);
    });
})