/**
 * Created by root on 16-1-20.
 */
var HeaderModule = angular.module("HeaderModule", []);
HeaderModule.controller("headerCtrl", function($rootScope, $scope, $location, AuthService, SocketService){

    if(sessionStorage.getItem("user") != null){
        var user = JSON.parse(sessionStorage.getItem("user"));
        $scope.nickname = user.nickname;
        $rootScope.username = user.username;
        SocketService.emit("addUser", {username: $rootScope.username});
    } else {
        AuthService.logout();
    }

    $scope.logout = function(){
        AuthService.logout();
    }

});