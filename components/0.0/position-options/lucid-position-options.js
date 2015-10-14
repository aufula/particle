angular.module('lucidPositionOptions', [])
    .directive('lucidPositionOptions', function() {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: 'components/0.0/position-options/lucid-position-options.html',
        };
    });