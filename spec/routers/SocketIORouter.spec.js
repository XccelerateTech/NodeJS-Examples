const SocketIORouter = require('../../routers/SocketIORouter');

describe('SocketIORouter ',()=>{
    let socketIORouter;
    let socket;
    let io;


    beforeEach(()=>{
        io = jasmine.createSpy();
        socketIORouter = new SocketIORouter(io);
        socket = jasmine.createSpyObj("socket",["emit"]);
        socket.session = {
            passport:{
                user: "Gordon"
            }
        }
    });

    it("should support connection event",()=>{
        socketIORouter.connection(socket);
        expect(socket.emit).toHaveBeenCalledWith("username","Gordon");
    });

});