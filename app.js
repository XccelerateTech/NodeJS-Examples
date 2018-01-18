// General Initialization
const knexFile = require('./knexfile')[process.env.NODE_ENV || 'development' ]
const knex = require('knex')(knexFile)

const isLoggedIn = require('./utils/guard').isLoggedIn;

// Dependency Injection for Routers and Service
const ViewRouter = require('./ViewRouter');

const { GroupRouter,
        UserRouter,
        SocketIORouter} = require('./routers');

const { GroupService,
        UserService,
        RedisService} = require('./services');

let redisService = new RedisService();
let groupService = new GroupService(knex,redisService);
let userService = new UserService(knex,redisService);

const {app,server,io} = require('./utils/init-app')(redisService);


new SocketIORouter(io).router();
app.use('/',new ViewRouter().router());
app.use('/api/groups',isLoggedIn,new GroupRouter(groupService).router());
app.use('/api/users',isLoggedIn,new UserRouter(userService).router());


server.listen(8080,()=>{
    console.log("Application started at port:8080");
});