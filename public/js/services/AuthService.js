/**
 * Created by root on 16-2-2.
 */
AuthModule.factory('AuthService', function($http, $q, $window, $location){

    return {

        login : function(userInfo){
            var loginUrl = "/user/login";
            var deferred = $q.defer();

            $http.post(loginUrl, {username : userInfo.username, password : userInfo.password})
                .success(function(data){
                    if(data.msg == "success") {
                        $window.sessionStorage.setItem("user", JSON.stringify(data.user));
                    }
                    deferred.resolve(data.msg);
                }).error(function(data) {
                    deferred.reject(data);
                });

            return deferred.promise;
        },

        logout : function(){
            $window.sessionStorage.clear();

            $location.path("/");
        },

        register : function(userInfo){
            var registerUrl = "/user/register";
            var deferred = $q.defer();

            $http.post(registerUrl, userInfo)
                .success(function(data){
                    deferred.resolve(data);
                }).error(function(data) {
                    deferred.reject(data);
                });

            return deferred.promise;

        },

        isLoggedIn : function(){
            if($window.sessionStorage.getItem("user") != '') {
                return true;
            } else {
                return false;
            }
        }

    }


});