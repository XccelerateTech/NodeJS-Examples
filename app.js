// General Initialization
const knexFile = require('./knexfile')[process.env.NODE_ENV || 'development' ]
const knex = require('knex')(knexFile)

const isLoggedIn = require('./utils/guard').isLoggedIn;

// Dependency Injection for Routers and Service
const ViewRouter = require('./ViewRouter');
const GroupRouter = require('./routers/GroupRouter');
const UserRouter = require('./routers/UserRouter');
const SocketIORouter = require('./routers/SocketIORouter');

const GroupService = require('./services/GroupService');
const UserService = require('./services/UserService');
const RedisService = require('./services/RedisService');


let redisService = new RedisService();
let groupService = new GroupService(knex,redisService);
let userService = new UserService(knex,redisService);



const {app,server,io} = require('./utils/init-app')();
require('./utils/init-sessions')(app,io,redisService);
require('./utils/init-passport')(app);

new SocketIORouter(io).router();
app.use('/',new ViewRouter().router());
app.use('/api/groups',isLoggedIn,new GroupRouter(groupService).router());
app.use('/api/users',isLoggedIn,new UserRouter(userService).router());


server.listen(8080,()=>{
    console.log("Application started at port:8080");
});