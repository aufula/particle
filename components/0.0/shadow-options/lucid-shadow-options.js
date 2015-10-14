angular.module('lucidShadowOptions', [])
    .directive('lucidShadowOptions', function() {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: 'components/0.0/shadow-options/lucid-shadow-options.html',
        };
    });