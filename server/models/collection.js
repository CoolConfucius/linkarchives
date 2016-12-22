console.log('collection model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new mongoose.Schema({
  name: { type: String }, 
  description: { type: String }, 
  owner: { type: String }, 
  recentby: { type: String }, 
  // ownerid: { type: String }, 
  isprivate: { type: Boolean, default: false }, 
  isclosed: { type: Boolean, default: false }, 
  views: { type: Number, default: 1 }, 
  likes: { type: Number, default: 1 }, 
  _links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }]
}, {timestamps: true})

var Collection = mongoose.model('Collection', CollectionSchema);