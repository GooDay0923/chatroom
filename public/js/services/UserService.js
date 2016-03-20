/**
 * Created by root on 16-2-27.
 */
ChatRoomModule.factory('UserService', function($http, $q, $window){

    return {

        getAllOnlineUser : function(){
            var loginUrl = "/user/onlineUserList";
            var deferred = $q.defer();

            var userInfo = JSON.parse($window.sessionStorage.getItem("user"));

            $http.post(loginUrl, {username : userInfo.username})
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(msg){
                    deferred.reject(msg);
                });

            return deferred.promise;
        },

        searchOnlineUser : function(nickname){
            var loginUrl = "/user/searchOnlineUser";
            var deferred = $q.defer();

            $http.post(loginUrl, {nickname : nickname})
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(msg){
                deferred.reject(msg);
            });

            return deferred.promise;
        }

    }

});