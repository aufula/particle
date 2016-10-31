angular.module("lucidGrowl", ['appConfig'])
    .directive('lucidGrowl', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                color: '@',
                hideGrowl: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'growl/lucid-growl.html',
        };
    }]); 