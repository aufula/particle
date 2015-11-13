angular.module("lucidButton", ['appConfig'])
    .directive('lucidButton', function(config) {
        return {
            restrict: 'E',
            scope: {
                color: '@',
                icon: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'button/lucid-button.html',
        };
    }); 