angular.module("lucidPopoverMenu", [])
    .directive('lucidPopoverMenu', function($document) {
        return {
            restrict: 'E',
            scope: {
                width: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: "components/0.0/popover-menu/lucid-popover-menu.html",

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopover = false;
                        //console.log("hide popup", e.target.className);
                        scope.$apply();
                    }
                });
            }
        };
    }); 