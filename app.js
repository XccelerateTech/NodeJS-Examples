// General Initialization
require('dotenv').config();
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379
const NODE_ENV = process.env.NODE_ENV || 'development' 

const knexFile = require('./knexfile')[NODE_ENV]
const knex = require('knex')(knexFile)

const redis = require('redis');
const redisClient = redis.createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
})
const fs = require('fs');
const https = require('https')

const isLoggedIn = require('./utils/guard').isLoggedIn;

// Dependency Injection for Routers and Service
const ViewRouter = require('./ViewRouter');

const { GroupRouter,
        UserRouter,
        SocketIORouter} = require('./routers');

const { GroupService,
        UserService} = require('./services');

let groupService = new GroupService(knex,redisClient);
let userService = new UserService(knex,redisClient);

const {app,server,io} = require('./utils/init-app')(redisClient);


new SocketIORouter(io,userService).router();
app.use('/',new ViewRouter().router());
app.use('/api/groups',isLoggedIn,new GroupRouter(groupService).router());
app.use('/api/users',isLoggedIn,new UserRouter(userService).router());


const httpsOptions = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt')
}


https.createServer(httpsOptions, app).listen(8443, () => {
    console.log('server running at ' + 8443)
})
