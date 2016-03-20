/**
 * Created by root on 16-1-18.
 */

require.config({

    paths: {
        'angular': '../lib/angular',
        'angular-ui-router': '../lib/angular-ui-router',
        'ngscrollbar': '../lib/ngscrollbar'
    },
    shim: {
        'angular' : {'exports' : 'angular'},
        'angular-ui-router' : {deps : ['angular']},
        'ngscrollbar'  : {deps: ['angular']},
    }

});

//require(['angular',
//    'widget.scrollbar',
//    'ui.router'
//], function (angular) {
//    angular.bootstrap(document, ['chatApp']);
//});