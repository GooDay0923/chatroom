/**
 * Created by root on 16-1-25.
 */


ChatRoomModule
    .directive("contenteditabledirective", function(){
        //make to read pre ng-model
        return {
            require : 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                // view -> model
                elm.bind('keyup', function () {
                    scope.$apply(function () {
                        ctrl.$setViewValue(elm.html());
                    });
                });

                // model -> view
                ctrl.$render = function () {
                    elm.html(ctrl.$viewValue);
                };

                // load init value from DOM
                ctrl.$setViewValue(elm.html());
            }
        }
    })
    .directive("message", function($timeout){
        return {
            restrict: 'E',
            templateUrl: 'message.html',
            scope:{
                info:"=",
                self:"=",
                scrolltothis:"&",

            },
            link:function(scope, elem, attrs){
                $timeout(scope.scrolltothis);
            }
        }
    }).directive("chatlist", function($timeout){
    return {
        restrict: 'E',
        templateUrl: 'chat-user-list.html',
        scope:{
            //user:"=",
            //iscurrentreceiver:"=",
            //itemClick:"&"
        },
        link:function(scope, elem, attrs){
            $timeout(function(){
                //elem.find('.avatar').css('background',scope.info.color);
            });
        }
    }
});

