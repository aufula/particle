angular.module("lucidButtcon", [])
    .directive('lucidButtcon', function($document, canvasData) {
        return {
            restrict: 'E',
            scope: {
                icon: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: "/components/0.0/buttcon/lucid-buttcon.html",

            controller: function($scope) {},

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopup = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    });