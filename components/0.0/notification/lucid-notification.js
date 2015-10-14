angular.module("lucidNotification", ['appConfig'])
    .directive('lucidNotification', function(config) {
        return {
            restrict: 'E',
            scope: {
                type: '@',
                button: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'notification/lucid-notification.html',
        };
    }); 