const { Schema, model } = require('mongoose');
const Messages = new Schema({
  username: {type: String},
  context: {type: String},
  createdAt:{type: String},
});
module.exports = model('Messages', Messages);