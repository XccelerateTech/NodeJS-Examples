const knexfile = require('./knexfile')[process.env.NODE_ENV || 'development' ]
const knex = require('knex')(knexfile)

const express = require('express');

const app = express();
const hb = require('express-handlebars');
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static("public"));


app.get('/users', function(req, res) {
        
});



app.listen(8080);

module.exports.mainApp = app