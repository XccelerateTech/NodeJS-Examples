const GroupRouter = require('../../routers/GroupRouter')

describe('GroupRouter should',()=>{
    let groupRouter ;
    let request;
    let response;

    beforeEach(()=>{
        groupRouter = new GroupRouter();
    });

    it("support get method",()=>{
        groupRouter.get(req,res)
    });

    it("support post method",()=>{

    });

    it("support put method",()=>{

    });

    it("support delete method",()=>{

    });
})