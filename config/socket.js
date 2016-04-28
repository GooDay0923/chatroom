/**
 * Created by root on 16-2-29.
 */
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (io){
    var connectedSockets={};

    io.sockets.on('connection', function (socket) {

        socket.on('addUser',function(data){ //when new user added

            var socketMessage = {username : data.username, nickname : ""};
            User.findOne({username: data.username}, function(err, user) {
                if(err) {
                    console.error(err);
                    throw err;
                }

                socketMessage.nickname = user.nickname;

                socket.broadcast.emit('userAddingResult', socketMessage);

            });

            socket.username = data.username;
            connectedSockets[socket.username] = socket;//save each socket to send message

            User.update({username : data.username}, {$set: { online : true }}).exec();
        });

        socket.on('sendMessage',function(data){ //when user send message, the other user recive message


            connectedSockets[data.to].emit('messageAdded', data);
        });

        socket.on('disconnect', function () {  //use logout chatroom
            console.log('user:' + socket.username + " disconnect...");

            socket.broadcast.emit('userLogout',{username : socket.username, result : true});

            delete connectedSockets[socket.username]; //delete the user socket

            User.update({username: socket.username}, {$set: {online: false}}).exec();
        });

    });
};