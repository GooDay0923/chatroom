/**
 * Created by root on 16-1-8.
 */
'use strict';

//load enviroment
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * Module dependencies.
 */
var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    mongoose = require('mongoose');

//Load configurations
var config = require('./config/config');

var app = express(),
    server = require('http').createServer(app),
    //server = require('http').Server(app),
    //io = require('socket.io').listen(server),
    io = require('socket.io').listen(5000),
    db = mongoose.connect(config.db);

//load models
var modelPath = path.join(__dirname, 'app/model');
fs.readdirSync(modelPath).forEach(function (file) {
    console.log("load modelPath:" + modelPath + '/' + file);
    require(modelPath + '/' + file);
});

//Start the app by listening on <port>
var port = process.env.PORT || config.port;

// Express settings
require('./config/express')(app);

// Socket.io configuration
require('./config/socket')(io);

// routes
require('./config/routes')(app);

// server start
app.listen(port);
console.log('Chat app started on port ' + port);

//expose app
//exports = module.exports = app;