/**
 * Created by root on 16-1-11.
 */
'use strict';

var userController = require('../app/controller/userController');

/**
 * Application routes
 */
module.exports = function(app) {

    app.post('/user/register', userController.register);
    app.post('/user/login', userController.login);
    app.post('/user/logout', userController.logout);
    app.post('/user/onlineUserList', userController.findAllOnline);

    ///**
    // * 404错误页跳转
    // */
    //app.use(function(req, res, next) {
    //    res.status(404).redirect('/common/404.html');
    //});

}