console.log('user model');

var mongoose = require('mongoose');
var jwt = require('jwt-simple');

var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  // username: {type: String, required: [true, "username is required"], unique: true},
  // username: {type: String, required: true, unique: true},
  username: {type: String},
  password: {type: String},
  imageurl: { type: String, default: "http://orig01.deviantart.net/bc8c/f/2014/094/3/6/inspector_shibe_by_marustagram-d7cwcvj.jpg" },
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

UserSchema.methods.token = function() {
  var payload = {
    username: this.username,
    _id: this._id
  };
  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  return token;
};

var User = mongoose.model('User', UserSchema);