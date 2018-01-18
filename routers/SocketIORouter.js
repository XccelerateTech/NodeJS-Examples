

class SocketIORouter{

    constructor(io){
        this.io = io;
    }

    router(){
        this.io.use((socket, next)=>{
            if(!socket.session.passport){
                socket.disconnect();
            }else{
                next();
            }
        });
        this.io.on('connection',this.connection.bind(this));
    }

    connection(socket){
        socket.emit('username', socket.session.passport.user);
    }
}

module.exports = SocketIORouter