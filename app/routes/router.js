// app/routes.js

var User = require('./model/user');


module.exports = function(router) {
    // create a new user
    router.route('/newuser')
        .post(function(req, res) {
            var username = req.body.username;
            var email = req.body.email;
            var password = req.body.password;

        });

    // routes for api's
    // ====================

    // poll data
    router.route('/api/polldata/:id')
    .get(function(req, res) {
        res.send('data');
    });
    // user data
    router.route('/users/:username')
        .get(function(req, res) {
            var input = req.params.username;
        });
};
