angular.module("lucidMoreDrawer", [])
    .directive('lucidMoreDrawer', function() {
        return {
            restrict: 'E',
            scope: {
                showdrawer: '=',
                height: '='
            },
            replace: true,
            transclude: true,
            templateUrl: "/components/0.0/more-drawer/lucid-more-drawer.html",
        };
    }); 