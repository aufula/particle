angular.module('lucidShadowOptions', ['appConfig'])
    .directive('lucidShadowOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'shadow-options/lucid-shadow-options.html',
        };
    });