console.log('user model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String},
  imageurl: { type: String },
  summary: { type: String }, 
  age: { type: Number }, 
  birthday: { type: Date }, 
  gender: { type: String }, 
  location: { type: String }, 
  email: { type: String }, 
  interests: { type: String }, 
  collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }]
  
}, {timestamps: true})

var User = mongoose.model('User', UserSchema);