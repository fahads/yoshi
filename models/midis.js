//Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var crate = require('mongoose-crate'),
  localFS = require('mongoose-crate-localfs');


var PostSchema = new mongoose.Schema({
  title: String
})
 
PostSchema.plugin(crate, {
  storage: new LocalFS({
    directory: '../midi'
  }),
  fields: {
    attachment: {}
  }
})
 
var Post = mongoose.model('Post', PostSchema)

// Return model
module.exports = restful.model('Products', productSchema);