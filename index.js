var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8000));

app.get('/', function(request, response) {
    response.send("Welcome to the Music MMO!");
});