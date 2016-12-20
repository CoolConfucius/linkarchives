console.log('collection model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new mongoose.Schema({
  title: { type: String }, 
  description: { type: String }, 
  owner: { type: String }, 
  ownerid: { type: String }, 
  isprivate: { type: Boolean }, 
  views: { type: Number, default: 1 }, 
  likes: { type: Number, default: 1 }, 
  links: [{ type: mongoose.Schema.Types.ObjectId, ref: "Link" }]
}, {timestamps: true})

var Collection = mongoose.model('Collection', CollectionSchema);