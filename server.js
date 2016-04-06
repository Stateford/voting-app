// server.js
/*jslint node: true*/
/*jslint esnext: true*/

// modules
// ========
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const passportlocal = require('passport-local');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// config
const configDB = require('./config/database');
const host = require('./config/host');

// scripts
const dbSearch = require('./app/scripts/dbsearch');

// connect to database
const mongoose = require('mongoose');
// mongoose.connect(configDB.db);


// confiure app to use bodyParser()
// this will const us get the data from a POST
app.use(morgan('dev'));  // logs every request to console
// app.use(cookieParser()); //read cookies

// load mongoose schemas
const User = require('./app/model/user');
const Poll = require('./app/model/poll');

// connect to the database
// mongoose.connect(configDB.db);


// use middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// set up router
// =========================
const router = express.Router();

require('./app/routes')(app, router);

// set the static files location
// ---------------------------------
app.use(express.static(__dirname + '/public'));

app.use('/', router);
// start server
// ============
app.listen(host.port);
console.log('server is listening to port: ' + host.port);
