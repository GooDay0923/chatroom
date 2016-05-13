/**
 * Created by root on 16-1-19.
 */

var ChatRoomModule = angular.module("ChatRoomModule", ['ngContextMenu']);
ChatRoomModule.controller("chatRoomCtrl", function($rootScope, $scope, $filter, UserService, SocketService){

    $scope.editAreaCtn = "";
    $scope.currentUserName = "";
    $scope.currentNickName = "";
    $scope.chatUserList = []; //user chat List
    $scope.chatContent = {}; //message Object
    $scope.messages = "";
    $scope.receiver = "";

    $scope.isMacOS = false;
    //could use it to judge system os
    //console.log(window.navigator);

    var messageWrapper = $(".chat-content .list");
    $scope.scrollToBottom=function() {
        messageWrapper.scrollTop(messageWrapper[0].scrollHeight);
    }

    var chatListWrapper = $(".panel-body .list .ngscroll-content-container");

    //get user list
    UserService.getAllOnlineUser()
        .then(function(data){
            if(data.msg == "success"){
                var tmpTime = (Date.parse(new Date) / 1000) - 1000;
                var dataList = data.userList;
                for(var user in dataList){
                    dataList[user].MMDigest = "";
                    dataList[user].noticeCount = 0;

                    tmpTime += 1;
                    dataList[user].time = tmpTime;
                    dataList[user].lastTime = 0;

                    $scope.chatUserList.push(dataList[user]);
                }
            }
        })
        .catch(function(err) {
            console.info(err);
        })

    //mouse right click to clear
    $scope.lists = [{
        label: 'clear'
    }]

    $scope.menuOptions = {
        itemLabel: 'label',
        isMultiple: false
    }

    $scope.clickMenu = function (item) {
        $scope.messages = $scope.chatContent[$scope.currentUserName] = "";
    };

    $scope.currentContact = {
        displayName : "",
        getDisplayName : function(){
            if($scope.currentContact.displayName){
                return true;
            } else {
                return false;
            }
        },
        setDisplayName : function(nickname) {
            $scope.currentNickName = nickname;
            $scope.currentContact.displayName = nickname;
        }
    };

    $scope.searchChatList = function(nickname){

    }

    $scope.itemClick = function(username, nickname){
        $scope.currentUserName = username;
        $scope.currentContact.setDisplayName(nickname);

        var currentChatUserList = $filter('findObject')($scope.chatUserList, username);

        currentChatUserList.noticeCount = 0;
        if(typeof($scope.chatContent[username]) != "undefined"){
            $scope.messages = $scope.chatContent[username];
        } else {
            $scope.messages = "";
        }
    }

    $scope.editAreaKeydown = function($event){
        if ($event.keyCode == 13 && $event.ctrlKey) {
            $scope.sendTextMessage();
        }
        if($event.keyCode == 13 && !$event.ctrlKey){
            //$scope.editAreaCtn = $scope.editAreaCtn + "\n";
        }
    }

    $scope.editAreaKeyup = function($event){
        //console.log($event);
        //console.log("editAreaKeyup");
    }

    $scope.editAreaClick = function($event){
        //console.log($event);
        //console.log("editAreaClick");
    }

    $scope.editAreaBlur = function($event){
        //console.log($event);
        //console.log("editAreaBlur");
    }

    $scope.sendTextMessage = function(){
        if($scope.editAreaCtn.replace(/(^\s*)|(\s*$)/g, "")){
            var rec = $scope.currentUserName;

            var currentChatUserList = $filter('findObject')($scope.chatUserList, rec);
            var time = 0;
            var currentTime = Date.parse(new Date);
            if(currentTime - currentChatUserList.lastTime > 60000){
                time = currentTime;
                currentChatUserList.lastTime = currentTime;
            }

            var msg = {content : $scope.editAreaCtn, from : $rootScope.username, to : $scope.currentUserName, time : time};

            if(!$scope.chatContent[rec]){
                $scope.chatContent[rec]=[];
            }

            $scope.chatContent[rec].push(msg);


            if(rec !== $rootScope.username) { //except send to myself
                SocketService.emit("sendMessage", msg);

                currentChatUserList.MMDigest = $scope.editAreaCtn;
                currentChatUserList.time = Date.parse(new Date) / 1000;
                $scope.editAreaCtn = "";
                $scope.messages = $scope.chatContent[rec];
                chatListWrapper.css("margin-top", "0");
            }
        }
    }


    //recept the new message
    SocketService.on('messageAdded', function(data) {

        console.log(data.time);

        document.getElementById("jp_audio_0").play();

        if(!$scope.chatContent[data.from]){
            $scope.chatContent[data.from]=[];
        }

        $scope.chatContent[data.from].push(data);


        var currentChatUserList = $filter('findObject')($scope.chatUserList, data.from);
        console.log(currentChatUserList);
        if(currentChatUserList.lastTime == 0){
            currentChatUserList.lastTime = data.time;
        }

        console.log(currentChatUserList.lastTime);

        currentChatUserList.MMDigest = data.content;
        currentChatUserList.time = Date.parse(new Date) / 1000;

        chatListWrapper.css("margin-top", "0");

        if($scope.currentUserName != data.from){
            currentChatUserList.noticeCount++;
        } else {
            $scope.messages = $scope.chatContent[data.from];
        }

    });


    SocketService.on('userAddingResult', function(data){
        var chatUser = [];
        chatUser.username = data.username;
        chatUser.nickname = data.nickname;
        chatUser.MMDigest = "";
        chatUser.noticeCount = 0;
        chatUser.time = Date.parse(new Date) / 1000;
        chatUser.lastTime = 0;

        $scope.chatUserList.push(chatUser);

    });

    SocketService.on('userLogout', function(data) {

        for(var i in $scope.chatUserList){
            if( $scope.chatUserList[i].username == data.username){
                $scope.chatUserList.splice(i, 1);
                break;
            }
        }
    });

});
