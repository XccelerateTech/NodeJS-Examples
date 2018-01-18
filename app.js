// General Initialization
const knexFile = require('./knexfile')[process.env.NODE_ENV || 'development' ]
const knex = require('knex')(knexFile)

const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('./utils/init')(app);
const isLoggedIn = require('./utils/guard').isLoggedIn;

// Dependency Injection for Routers and Service
const ViewRouter = require('./ViewRouter');
const GroupRouter = require('./routers/GroupRouter');
const UserRouter = require('./routers/UserRouter');

const GroupService = require('./services/GroupService');
const UserService = require('./services/UserService');
const RedisService = require('./services/RedisService');
const SessionService = require('./services/SessionService');

let redisService = new RedisService();
let sessionService = new SessionService(redisService);
let groupService = new GroupService(knex,redisService);
let userService = new UserService(knex,redisService);

// Routes
io.use(sessionService.socketIO());

app.use(sessionService.express());
app.use('/',new ViewRouter().router());
app.use('/api/groups',isLoggedIn,new GroupRouter(groupService).router());
app.use('/api/users',isLoggedIn,new UserRouter(userService).router());

app.listen(8080,()=>{
    console.log("Application started at port:8080");
});
