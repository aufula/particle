angular.module('lucidPositionOptions', ['appConfig'])
    .directive('lucidPositionOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'position-options/lucid-position-options.html',
        };
    });