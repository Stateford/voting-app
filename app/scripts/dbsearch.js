// app/scripts/dbsearch.js
/*jslint node: true, esversion: 6*/
/*
* checks to see if user or password
* already exists in the database
*/
// MODULE
// =======
const mongoose = require('mongoose');

// SCHEMAS
// ==========
const User = require('../model/user');
const Poll = require('../model/poll');

// establish connection
mongoose.connect(process.env.PORT);



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
