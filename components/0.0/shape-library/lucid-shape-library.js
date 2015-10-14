angular.module('lucidShapeLibrary', [])
    .directive('lucidShapeLibrary', function($document) {
        return {
            restrict: 'E',
            scope: {
                shapegroup: '=',
                width: '='
            },
            replace: true,
            transclude: true,
            templateUrl: "/components/0.0/shape-library/lucid-shape-library.html",

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopover = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    }); 