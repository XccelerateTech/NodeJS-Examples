

class SocketIORouter{

    constructor(io){
        this.io = io;
    }

    router(){
        io.use((socket, next)=>{
            if(!socket.session.passport){
                socket.disconnect();
            }else{
                next();
            }
        });
        io.on('connection',this.connection.bind(this));
    }

    connection(socket){
        socket.emit('username', socket.session.passport.user);
    }
}