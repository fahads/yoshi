// Deps
var express = require('express');
var router = express.Router();

//Models
var Product = require('../models/midis');

//Routes
Product.methods(['get', 'put', 'post', 'delete']);
Product.register(router, '/midis');

// Return router
module.exports = router;