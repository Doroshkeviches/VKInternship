const { Schema, model } = require('mongoose');
const Posts = new Schema({
  author: {type: Object},
  content: {type: String},
  createdAt:{type: String},
  images: {type: Array},
  likes: {type: Number},
});
module.exports = model('Posts', Posts);