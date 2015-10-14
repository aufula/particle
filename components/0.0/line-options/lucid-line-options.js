angular.module('lucidLineOptions', ['appConfig'])
    .directive('lucidLineOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'line-options/lucid-line-options.html',
        };
    });