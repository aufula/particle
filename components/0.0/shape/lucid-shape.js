angular.module('lucidShape', ['appConfig'])
    .directive('lucidShape', function(config) {
        return {
            restrict: 'E',
            scope: {
                 shape: '=',
                // color: '=',
                // line: '=',
                // text: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'shape/lucid-shape.html',
        };
    });