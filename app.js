const knexFile = require('./knexfile')[process.env.NODE_ENV || 'development' ]
const knex = require('knex')(knexFile)

const GroupRouter = require('./routers/GroupRouter');
const ProjectRouter = require('./routers/ProjectRouter');
const UserRouter = require('./routers/UserRouter');


const GroupService = require('./services/GroupService');
const ProjectService = require('./services/ProjectService');
const UserService = require('./services/UserService');

const express = require('express');

const app = express();
const hb = require('express-handlebars');
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static("public"));

let groupService = new GroupService(knex);
let projectService = new ProjectService(knex);
let userService = new UserService(knex);


app.use('/groups',new GroupRouter(groupService).router())
app.use('/project',new ProjectRouter(projectService).router())
app.use('/users',new UserRouter(userService).router())






app.listen(8080);

module.exports.mainApp = app