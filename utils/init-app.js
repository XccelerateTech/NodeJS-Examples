const express = require('express');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');


module.exports = (redisClient)=>{
    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    app.engine('handlebars', hb({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
    app.use(express.static("public"));
    app.use(bodyParser.json());

    require('./init-sessions')(app,io,redisClient);
    require('./init-passport')(app);

    return{
        app : app,
        server: server,
        io: io
    }
}