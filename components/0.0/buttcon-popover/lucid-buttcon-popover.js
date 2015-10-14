angular.module("lucidButtconPopover", ['appConfig'])
    .directive('lucidButtconPopover', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                icon: '@',
                width: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'buttcon-popover/lucid-buttcon-popover.html',
            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopover = false;
                        //console.log("hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    }); 