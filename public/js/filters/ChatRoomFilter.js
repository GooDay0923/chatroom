/**
 * Created by root on 16-3-13.
 */
ChatRoomModule.filter('trust', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }

}).filter('findObject', function () {
    return function (array, username) {
        for(var i in array){
            if( array[i].username == username){
                return array[i];
            }
        }
        //angular.forEach(array, function(value, key){
        //    if(value.toUId == toUId){
        //        console.log(value);
        //        return value;
        //    }
        //})

    }
});