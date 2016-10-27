angular.module("lucidMoreDrawer", ['appConfig'])
    .directive('lucidMoreDrawer', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                showdrawer: '=?',
                height: '@',
                tophandle: '@',
                more: '@',
                less:'@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'more-drawer/lucid-more-drawer.html',
            compile: function(element, attrs) {
                if (!attrs.more){
                    attrs.more = 'More';
                }
                if (!attrs.less){
                    attrs.less = 'Less';
                }
            }
        };
    }]); 