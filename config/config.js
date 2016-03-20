/**
 * Created by root on 16-1-7.
 */
'use strict';

var _ = require('lodash');

// Load app configuration

module.exports = _.extend(
    require(__dirname + '/../config/env/all.js'),
    require(__dirname + '/../config/env/' + process.env.NODE_ENV + '.js') || {});
