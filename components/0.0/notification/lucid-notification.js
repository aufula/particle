angular.module("lucidNotification", [])
    .directive('lucidNotification', function() {
        return {
            restrict: 'E',
            scope: {
                type: '@',
                button: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: "components/0.0/notification/lucid-notification.html",
        };
    }); 