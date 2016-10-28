angular.module('lucidSearch', ['appConfig'])
    .directive('lucidSearch', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                value: '=?ngModel',
                width: '@',
                label: '@',
                placeholder: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'search/lucid-search.html',
        };
    }]);