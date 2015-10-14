angular.module('lucidBorderOptions', [])
    .directive('lucidBorderOptions', function() {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: '/components/0.0/border-options/lucid-border-options.html',
        };
    });