const SocketIORouter = require('../../routers/SocketIORouter');

describe('SocketIORouter ',()=>{
    let socketIORouter;
    let userService;
    let socket;
    let io;
    let users = [
        {
            first_name: "John",
            last_name : "Doe",
            email : "john.doe@gmail.com"
        }
    ]


    beforeEach(()=>{
        io = jasmine.createSpy();
        userService = jasmine.createSpyObj("userService",{
            list:Promise.resolve(users)
        })
        socketIORouter = new SocketIORouter(io,userService);
        socket = jasmine.createSpyObj("socket",["emit","on"]);
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

    it("should support getUsers event",()=>{
        socketIORouter.getUsers(socket)().then(()=>{
            expect(socket.emit).toHaveBeenCalledWith("users",users);
        });
    });
});