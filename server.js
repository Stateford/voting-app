// server.js

// modules
// ========
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var passportlocal = require('passport-local');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// config
var configDB = require('./config/database');
var host = require('./config/host');

// scripts
var dbSearch = require('./app/scripts/dbsearch');

// connect to database
var mongoose = require('mongoose');
// mongoose.connect(configDB.db);


// confiure app to use bodyParser()
// this will let us get the data from a POST
app.use(morgan('dev'));  // logs every request to console
// app.use(cookieParser()); //read cookies

// load mongoose schemas
var User = require('./app/model/user');
var Poll = require('./app/model/poll');

// connect to the database
mongoose.connect(configDB.db);


// use middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// set up router
// =========================
var router = express.Router();

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
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// mypolls.html
router.get('/mypolls', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/mypolls.html'));
});
// newpoll.html
router.get('/newpoll', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/newpoll.html'));
});
// signup.html
router.get('/signup', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/signup.html'));
});
// trending.html
router.get('/trending', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/trending.html'));
});
// user.html
router.get('/user/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/user.html'));
});

// set the static files location
// ---------------------------------
app.use(express.static(__dirname + '/public'));

app.use('/', router);
// start server
// ============
app.listen(host.port);
console.log('server is listening to port: ' + host.port);
