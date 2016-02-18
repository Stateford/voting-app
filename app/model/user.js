// app/model/user.js

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    polls: Number
});

// methods
// ================

// generate a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if the password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password
    this.password);
};


module.exports = mongoose.model('User', userSchema);