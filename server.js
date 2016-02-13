// server.js

// init
// ========
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

//port
var port = process.env.PORT || 8080;


// confiure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.get()

// start server
// ============
app.listen(port);
console.log('server is listening to port: ' + port);