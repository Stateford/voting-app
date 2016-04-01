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

require('./app/routes')(app, router);

// set the static files location
// ---------------------------------
app.use(express.static(__dirname + '/public'));

app.use('/', router);
// start server
// ============
app.listen(host.port);
console.log('server is listening to port: ' + host.port);
