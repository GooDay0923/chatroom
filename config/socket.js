/**
 * Created by root on 16-2-29.
 */
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (io){
    var connectedSockets={};

    io.sockets.on('connection', function (socket) {

        socket.on('addUser',function(data){ //有新用户进入聊天室

            socket.broadcast.emit('userAddingResult',{username : data.username, result : true});

            socket.username = data.username;
            connectedSockets[socket.username] = socket;//保存每个socket实例,发私信需要用

            User.update({username : data.username}, {$set: { online : true }}).exec();
        });

        socket.on('sendMessage',function(data){ //有用户发送新消息
            connectedSockets[data.to].emit('messageAdded',data);
        });

        socket.on('disconnect', function () {  //有用户退出聊天室
            console.log('user:' + socket.username + " disconnect...");

            socket.broadcast.emit('userLogout',{username : socket.username, result : true});

            delete connectedSockets[socket.username]; //删除对应的socket实例

            User.update({username: socket.username}, {$set: {online: false}}).exec();
        });

    });
};