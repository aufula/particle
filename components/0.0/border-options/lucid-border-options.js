angular.module('lucidBorderOptions', ['appConfig'])
    .directive('lucidBorderOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'border-options/lucid-border-options.html',
        };
    });