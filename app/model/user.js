// app/model/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    password: Hash,
    polls: Number
});

module.exports = mongoose.model('User', userSchema);