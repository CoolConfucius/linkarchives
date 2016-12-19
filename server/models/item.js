console.log('Item model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  // description: {type: String, required: true},
  description: {type: String},
  done: {tyep: Boolean, default: false},
  user: {type: String},
  taguser: {type: String}
  // _user: {type: Schema.Types.ObjectId, ref: 'User'}, 
  // _taguser: {type: Schema.Types.ObjectId, ref: 'User'}
}, {timestamps: true})

var Item = mongoose.model('Item', ItemSchema);