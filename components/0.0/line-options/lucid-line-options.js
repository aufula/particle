angular.module('lucidLineOptions', [])
    .directive('lucidLineOptions', function() {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: 'components/0.0/line-options/lucid-line-options.html',
        };
    });