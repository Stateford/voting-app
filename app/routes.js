// app/routes.js
/*jslint node: true*/
/*jslint esnext: true*/

"use strict";
// MODULES
// =========
let User = require('./model/user');
let Poll = require('./model/poll');
let path = require('path');
let dbSearch = require('./scripts/dbsearch');

module.exports = (app, router) => {
    //middleware to use for all requests
    router.use((req, res, next) => {
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
    router.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/index.html'));
    });

    // mypolls.html
    router.get('/mypolls', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/mypolls.html'));
    });
    // newpoll.html
    router.get('/newpoll', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/newpoll.html'));
    });
    // signup.html
    router.get('/signup', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/signup.html'));
    });
    // signin.html
    router.get('/signin', (req,res) => {
        res.sendFile(path.join(__dirname + '/../public/signin.html'));
    });
    // trending.html
    router.get('/trending/', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/trending.html'));
    });
    // user.html
    router.get('/user/*', (req, res) => {
        res.sendFile(path.join(__dirname + '/../public/user.html'));
    });
};
