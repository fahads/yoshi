//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;


//Schema
var productSchema = new mongoose.Schema({
    name: String,
    file: { data: Buffer, contentType: String }
});

// Return model
module.exports = restful.model('Products', productSchema);
