/**
 * Created by root on 16-1-12.
 */

var chatApp = angular.module('chatApp', ['ui.router', 'widget.scrollbar', 'AuthModule', 'ChatRoomModule', 'HeaderModule']);
chatApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginCtrl',
            cache: false
        })
        .state('chatroom', {
            url: '/chatroom',
            views: {
                '': {
                    templateUrl: 'common/main.html'
                },
                'header@chatroom': {
                    templateUrl: 'common/header.html',
                },
                'side-bar@chatroom': {
                    templateUrl: 'common/sidebar.html',
                },
                'content@chatroom': {
                    templateUrl: 'chatroom.html',
                }
            }
        })
        .state('register', {
            url: '/join',
            templateUrl: 'register.html',
            controller: 'loginCtrl',
            cache: false
        });

    $urlRouterProvider.otherwise('/login');

});