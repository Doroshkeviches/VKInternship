const { Schema, model } = require('mongoose');
const FriendList = new Schema({
    username: { type: String },
    friends: { type: Array },
});
module.exports = model('FriendList', FriendList);