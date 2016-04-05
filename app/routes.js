// app/routes.js

// MODULES
// =========
var User = require('./model/user');
var Poll = require('./model/poll');
var path = require('path');

module.exports = function(app, router) {
    //middleware to use for all requests
    router.use(function(req, res, next) {
        //do logging
        console.log('Something is happening.');
        next();
    });

    // route for creating a new user using POST
    router.route('/newuser')
        .post(function(req, res) {
            var username = req.body.username;
            var email = req.body.email;
            var password = req.body.password;

            if(dbSearch.user(username)) {
                res.send('username is already in use');
            } else if (dbSearch.email(email)) {
                res.send('email is already in use');
            } else if (username !== '' && email !== '' && password !== '') {
                var user = new User();
                user.username = username;
                user.email = email;
                user.password = user.generateHash(password);

                user.save(function(err) {
                    if(err)
                        res.send(err);

                    res.send('user created!');
                });
            } else {
                res.send('please enter all required fields');
            }
        });


    // ROUTES FOR APIs
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
            if(dbSearch.user(input)) {
                User.find({ username: input}, function(err, links) {
                    if(links.length){
                        res.json(links);
                    } else {
                        res.send('user does not exist');
                    }
                });
            }
        });



    // SENDING FILES TO CLIENT
    // =========================
    // serve index.html
    // -------------------
    router.get('/', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    // mypolls.html
    router.get('/mypolls', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/mypolls.html'));
    });
    // newpoll.html
    router.get('/newpoll', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/newpoll.html'));
    });
    // signup.html
    router.get('/signup', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/signup.html'));
    });
    // trending.html
    router.get('/trending/', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/trending.html'));
    });
    // user.html
    router.get('/user/*', function(req, res) {
        res.sendFile(path.join(__dirname + '/../public/user.html'));
    });
};
