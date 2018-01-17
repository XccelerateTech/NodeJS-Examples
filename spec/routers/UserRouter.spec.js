const UserRouter = require('../../routers/UserRouter')

describe('UserRouter should',()=>{
    let userRouter ;
    let request;
    let response;

    beforeEach(()=>{
        userRouter = new UserRouter();
    });

    it("support get method",()=>{
        userRouter.get(req,res)
    });

    it("support post method",()=>{

    });

    it("support put method",()=>{

    });

    it("support delete method",()=>{

    });
})