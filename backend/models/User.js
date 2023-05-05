const { Schema, model } = require('mongoose');
const User = new Schema({
  telNumber: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  date: {type: Number, required: true}
});
module.exports = model('User', User);
