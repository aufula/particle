angular.module('lucidShapeLibrary', ['appConfig'])
    .directive('lucidShapeLibrary', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                shapegroup: '=',
                width: '='
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'shape-library/lucid-shape-library.html',

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