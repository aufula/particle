angular.module('lucidInput', ['appConfig'])
    .directive('lucidInput', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                unit: '@',
                value: '=',
                width:'@',
                label: '@',
                placeholder:'@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'input/lucid-input.html',
        };
    }]);