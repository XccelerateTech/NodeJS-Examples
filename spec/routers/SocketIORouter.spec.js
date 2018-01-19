const SocketIORouter = require('../../routers/SocketIORouter');

describe('SocketIORouter ',()=>{
    let socketIORouter;
    let socket;
    let io;


    beforeEach(()=>{
        io = jasmine.createSpy();
        socketIORouter = new SocketIORouter(io);
        socket = jasmine.createSpy();
    });

    it("should support connection event",()=>{
        socketIORouter.connection(socket);
    });

});