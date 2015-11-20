angular.module("lucidPopoverMenu", ['appConfig'])
    .directive('lucidPopoverMenu', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                width: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'popover-menu/lucid-popover-menu.html',

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