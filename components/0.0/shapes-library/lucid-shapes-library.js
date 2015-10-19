angular.module('lucidShapesLibrary', ['appConfig'])
    .directive('lucidShapesLibrary', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                shapegroup: '=',
                width: '='
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'shapes-library/lucid-shapes-library.html',
            controller: function($scope){
                $scope.onDropComplete = function(data, event, shapegroup) {
                    //e.stopPropagation(); is there a way to stop this from happening on canvas? (shape manager)
                    if (data) {
                        var index = shapegroup.shapes.indexOf(data);
                        //console.log('shape', index);

                        if (index === -1) {
                            //var index = $scope.shapegroups.shapegroup.indexOf(data);
                            //console.log(index);
                            var newblock = JSON.parse(JSON.stringify(data));

                            newblock.shapepanel = true;
                            newblock.customcolor = true;
                            if (!newblock.url) {
                                //this is here so that we can save any shape from the library for reuse.
                                newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
                            }
                            shapegroup.shapes.push(newblock);
                            //console.log("shape saved to shapegroup", newblock);
                        }
                    }
                };
            },
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