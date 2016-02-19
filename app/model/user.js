// app/model/user.js

// modules
// =========
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// scripts
var configDB = require('../../config/database');
var connection = mongoose.createConnection(configDB.db);

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
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
