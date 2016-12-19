console.log('user model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  _items: [{type: Schema.Types.ObjectId, ref: 'Item'}]
  // ,
  // _pending: [{type: Schema.Types.ObjectId, ref: 'Item'}]
}, {timestamps: true})

var User = mongoose.model('User', UserSchema);