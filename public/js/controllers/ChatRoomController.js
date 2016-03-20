/**
 * Created by root on 16-1-19.
 */

var ChatRoomModule = angular.module("ChatRoomModule", ['ngContextMenu']);
ChatRoomModule.controller("chatRoomCtrl", function($rootScope, $scope, $sce, UserService, SocketService){

    $scope.editAreaCtn = "";
    $scope.currentUserName = "";
    $scope.chatUserList = {}; //user chat List
    $scope.chatContent = {}; //message Object
    $scope.messages = "";
    $scope.receiver = "";

    $scope.isMacOS = false;
    //could use it to judge system os
    //console.log(window.navigator);

    var messageWrapper = $(".list");
    $scope.scrollToBottom=function() {
        messageWrapper.scrollTop(messageWrapper[0].scrollHeight);
    }

    //get user list
    UserService.getAllOnlineUser()
        .then(function(data){
            if(data.msg == "success"){
                //$scope.chatUserList = data.userList;
                for(var user in data.userList){
                    var nickname = data.userList[user].nickname;
                    $scope.chatUserList[nickname] = data.userList[user];
                    $scope.chatUserList[nickname].MMDigest = "";
                    $scope.chatUserList[nickname].noticeCount = 0;
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
        //doctorName : "",
        getDisplayName : function(){
            if($scope.currentContact.displayName){
                return true;
            } else {
                return false;
            }
        },
        //setDisplayName : function(username, doctorName) {
        //    $scope.currentContact.displayName = username;
        //    $scope.currentContact.doctorName = doctorName;
        //    $scope.currentUserName = username;
        //},
        setDisplayName : function(username) {
            $scope.currentContact.displayName = username;
            $scope.currentUserName = username;
        }
    };

    $scope.searchChatList = function(nickname){

    }

    $scope.itemClick = function(username){
        //$scope.currentContact.setDisplayName(username, '王精明');
        $scope.currentContact.setDisplayName(username);
        $scope.chatUserList[username].noticeCount = 0
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

            var msg = {content : $scope.editAreaCtn, from : $rootScope.username, to : $scope.currentUserName, time : new Date()};

            if(!$scope.chatContent[rec]){
                $scope.chatContent[rec]=[];
            }

            $scope.chatContent[rec].push(msg);
            $scope.messages = $scope.chatContent[rec];

            if(rec !== $rootScope.username) { //except send to myself
                SocketService.emit("sendMessage", msg);
                $scope.chatUserList[rec].MMDigest = $scope.editAreaCtn;
                $scope.editAreaCtn = "";
            }
        }
    }


    //recept the new message
    SocketService.on('messageAdded', function(data) {

        document.getElementById("jp_audio_0").play();

        if(!$scope.chatContent[data.from]){
            $scope.chatContent[data.from]=[];
        }

        $scope.chatContent[data.from].push(data);
        $scope.chatUserList[data.from].MMDigest = data.content;

        if($scope.currentUserName != data.from){
            $scope.chatUserList[data.from].noticeCount += 1;
        }

    });

});
