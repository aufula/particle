angular.module("lucidButton", [])
    .directive('lucidButton', function() {
        return {
            restrict: 'E',
            scope: {
                color: '@',
                icon: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: "/components/0.0/button/lucid-button.html",
        };
    }); 