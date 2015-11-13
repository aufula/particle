angular.module('lucidTextOptions', ['appConfig'])
    .directive('lucidTextOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'text-options/lucid-text-options.html',
        };
    });