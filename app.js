const express = require('express');
const app = express();

app.use(express.static("public"));


app.get('/users', function(req, res) {
    
});


app.listen(8080);

module.exports.mainApp = app