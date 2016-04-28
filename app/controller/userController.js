/**
 * Created by root on 16-1-9.
 */
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.register = function(req, res){
    console.log("start signup request");
    console.log("req.body:" + JSON.stringify(req.body));

    if(!req.body.nickname){
        req.body.nickname = req.body.username;
    }

    var newUser = new User(req.body);

    newUser.save(function(err){
        if (err) {
            return res.json(err);
        } else {
            return res.json({message : "success"});
        }
    });
};

exports.login = function(req, res){

    console.log("start login request");
    console.log("req.body:" + JSON.stringify(req.body));

    User.findOneAndUpdate({username : req.body.username, password : req.body.password}, { online : true, last_login_time : new Date()}, function(err, user){

        if (err) {
            return res.json({err : err});
        }

        console.log('user:' + user);
        if (user == null) {
            return res.json({msg : 'failed'});
        } else {
            req.session.user = user;
            return res.json({msg : 'success', user : user});
        }

    });

};

exports.logout = function(req, res){

    console.log("start logout request");

    User.update({username : req.body.username}, {$set: { online : false }}).exec();

    return res.json({msg : 'success'});

};

exports.findAllOnline = function(req, res){

    console.log("start find all online user request");

    User.find({ online : true, username : {$nin:[req.body.username]}}, function(err, user){

        if (err) {
            return res.json({err : err, msg : 'failed'});
        } else {
            return res.json({msg : 'success', userList : user});
        }

    });

};

exports.isLogin = function(req, res){

    if(req.session.user != ''){
        return true;
    } else {
        return false;
    }

};

exports.searchOnlineUser = function(req, res){

    console.log("start find all online user request");

    User.find({ online : true, nickname: {$regex:/req.body.nickname.*/i}}, function(err, user){

        if (err) {
            return res.json({err : err, msg : 'failed'});
        } else {
            return res.json({msg : 'success', userList : user});
        }

    });

};


