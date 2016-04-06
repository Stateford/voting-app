// app/scripts/dbsearch.js
/*jslint node: true*/
/*jslint esnext: true*/
//
// module
// ===============================
const mongoose = require('mongoose');

// config
// ========
const configDB = require('../../config/database');

// schemas
// ==========
const User = require('../model/user');
const Poll = require('../model/poll');

// establish connection
mongoose.connect(configDB.db);



module.exports = {
    // search by username to check if it already exists in database
    user: (str) => {
        User.find({ username: str }, (err, user) => {
            if(user.length) {
                return true;
            } else {
                return false;
            }
        });
    },
    // search by email to check if it already exists in database
    email: (str) => {
        User.find({ email: str }, (err, user) => {
            if(user.length) {
                return true;
            } else {
                return false;
            }
        });
    }
};
