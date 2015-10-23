//Vars
var port = 3030;

//Dependencies
var express = require("express");

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//MongoDB
mongoose.connect('mongodb://localhost/rest_test');

//Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/api', require('./api'));

app.listen(port);
console.log("API is running on port: " + port);