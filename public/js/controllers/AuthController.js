/**
 * Created by root on 16-1-12.
 */

var AuthModule = angular.module("AuthModule",[]);
AuthModule.controller("loginCtrl", function($scope, $location, AuthService){
    $scope.errorMsg = "";
    $scope.userInfo = {
        username: "",
        password: ""
    };

    $scope.login = function(){
        $scope.errorMsg = "";

        AuthService.login($scope.userInfo)
            .then(function(msg){
                // Logged in, redirect to chatroom
                if(msg == 'success'){
                    $location.path("/chatroom");
                } else {
                    $scope.errorMsg = "the username or password is wrong! please sign in again.";
                }
            })
            .catch(function(err) {
                console.info(err);
                $scope.errorMsg = "the username or password is wrong! please sign in again.";
            });
    }

}).controller("registerCtrl", function($scope, $location, AuthService){
    $scope.errorMsg = "";
    $scope.userinfo = {
        username : "",
        password : "",
        rePassword : "",
        nickname : "",
        sex : "male"
    };

    $scope.$watch('userinfo.rePassword', function(){
        $scope.errorMsg = "";
        if($scope.userinfo.password != $scope.userinfo.rePassword) {
            $scope.errorMsg = "password not the same";
        }
    });

    $scope.register = function(){
        $scope.errorMsg = "";

        if(!$scope.userinfo.nickname){
            $scope.userinfo.nickname = $scope.userinfo.username;
        }

        AuthService.register($scope.userinfo)
            .then(function(data){
                // Logged in, redirect to index
                if(data.message != "success"){
                    $scope.errorMsg =  data.errors.username.message;
                } else {
                    $location.path("/");
                }
            })
            .catch(function(err) {
                console.info(err);
                $scope.errorMsg = err;
            });

    }

});