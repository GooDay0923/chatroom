/**
 * Created by root on 16-2-28.
 */
ChatRoomModule.factory('SocketService', function($rootScope, $location){
    var url = $location.host() + ":5000";
    var socket = io.connect(url); //socket url address

    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    }

});