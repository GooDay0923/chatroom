/**
 * Created by root on 16-1-20.
 */
var SideBarModule = angular.module("SideBarModule", []);
SideBarModule.controller("sideBarCtrl", function($scope){

    $scope.changeBackground = function(element){
        console.log(element);
    }

});