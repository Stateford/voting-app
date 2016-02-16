// server.js

// modules
// ========
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//port
var port = process.env.PORT || 8080;

// connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017');

// confiure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


// set up router
// =========================
var router = express.Router();

//middleware to use for all requests
router.use(function(req, res, next) {
    //do logging
    console.log('Something is happening.');
    next();
});


// serve index.html
// -------------------
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

// api for db
// -----------------
router.route('/polldata/:id')
    .get(function(req, res) {
        res.send('data');
    });

// set the static files location
// ---------------------------------
app.use(express.static(__dirname + '/public')); 

app.use('/', router);
// start server
// ============
app.listen(port);
console.log('server is listening to port: ' + port);