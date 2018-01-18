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

const App = require('./App');

let redisService = new RedisService();
let groupService = new GroupService(knex,redisService);
let userService = new UserService(knex,redisService);

// Routes


let app = new App(redisService).init();
new SocketIORouter(app.io).router();
app.expressApp.use('/',new ViewRouter().router());
app.expressApp.use('/api/groups',isLoggedIn,new GroupRouter(groupService).router());
app.expressApp.use('/api/users',isLoggedIn,new UserRouter(userService).router());


app.start();