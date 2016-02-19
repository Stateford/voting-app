// app/scripts/dbsearch.js
//
// module
// ===============================
var mongoose = require('mongoose');

// config
// ========
var configDB = require('../../config/database');

// schemas
// ==========
var User = require('../model/user');
var Poll = require('../model/poll');

// establish connection
mongoose.connect(configDB.db);



module.exports = {
    // search by username to check if it already exists in database
    user: function(str) {
        User.find({ username: str }, function(err, user) {
            if(user.length) {
                return true;
            } else {
                return false;
            }
        })
    },
    // search by email to check if it already exists in database
    email: function(str) {
        User.find({ email: str }, function(err, user) {
            if(user.length) {
                return true;
            } else {
                return false;
            }
        })
    }
};
