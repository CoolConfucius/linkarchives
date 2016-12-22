console.log('link model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new mongoose.Schema({

  title: { type: String }, 
  description: { type: String }, 
  url: { type: String },
  tags: { type: String },
  collectionname: { type: String }, 
  collectionid: { type: String }, 
  addedby: { type: String }, 
  isimage: { type: Boolean, default: false }, 
  clicks: { type: Number, default: 1 }, 
  views: { type: Number, default: 1 }, 
  likes: { type: Number, default: 1 }

}, {timestamps: true})

var Link = mongoose.model('Link', LinkSchema);