// app/model/user.js
/*jslint node: true*/
/*jslint esnext: true*/

// modules
// =========
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// scripts
const configDB = require('../../config/database');
const connection = mongoose.createConnection(configDB.db);

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    polls: Number
});

// methods
// ================

// generate a hash
userSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if the password is valid
userSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', userSchema);
