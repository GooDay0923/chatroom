/**
 * Created by root on 16-1-8.
 */
'use strict';

var express = require('express'),
    config = require('./config'),
    session = require('express-session'),
    bodyParser = require('body-parser');

module.exports = function(app) {

    app.use('/', express.static(__dirname + '/../views/'));
    app.use(express.static(config.root + '/public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 10000 }
    }));

}