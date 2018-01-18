const express = require('express');
const bodyParser = require('body-parser');
const hb = require('express-handlebars');


module.exports = ()=>{
    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    app.engine('handlebars', hb({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');
    app.use(express.static("public"));
    app.use(bodyParser.json());

    return{
        app : app,
        server: server,
        io: io
    }
}