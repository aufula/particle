angular.module('lucidTextOptions', [])
    .directive('lucidTextOptions', function() {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: '/components/0.0/text-options/lucid-text-options.html',
        };
    });