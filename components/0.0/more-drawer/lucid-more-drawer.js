angular.module("lucidMoreDrawer", ['appConfig'])
    .directive('lucidMoreDrawer', function(config) {
        return {
            restrict: 'E',
            scope: {
                showdrawer: '=',
                height: '='
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'more-drawer/lucid-more-drawer.html',
        };
    }); 