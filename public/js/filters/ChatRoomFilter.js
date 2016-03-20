/**
 * Created by root on 16-3-13.
 */
ChatRoomModule.filter('trust', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    }

});