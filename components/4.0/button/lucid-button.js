angular.module("lucidButton", ['appConfig'])
    .directive('lucidButton', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                icon: '@',
                color: '@',
                text: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'button/lucid-button.html',
        };
    }]);