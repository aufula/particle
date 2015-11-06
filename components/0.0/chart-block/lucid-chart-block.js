angular.module("lucidChartBlock", ['appConfig'])
    .directive('lucidChartBlock', function(config, $document, shapesData) {
        return {
            restrict: 'E',
            scope: {
                block: '=',
                addsavedstyle: '=',
                currenttheme: '=',
            },
            replace: true,
            templateUrl: config.componentsURL + 'chart-block/lucid-chart-block.html',
            controller: function($scope) {
                $scope.shapegroups = shapesData;
                $scope.saveShape = function(data, shapegroup) {
                    var newblock = JSON.parse(JSON.stringify(data));

                    newblock.shapepanel = true;
                    newblock.customcolor = true;
                    newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
                    shapegroup.shapes.push(newblock);
                    //console.log("shape saved to shapegroup", newblock);
                };

                //$scope.showcontextMenu = false;
                // $scope.showcontextMenuPosition = function(block) {
                //     function getPosition(e) {
                //         var posx = 0;
                //         var posy = 0;

                //         if (!e) {
                //             var e = window.event;
                //         }

                //         if (e.pageX || e.pageY) {
                //             posx = e.pageX;
                //             posy = e.pageY;
                //         } else if (e.clientX || e.clientY) {
                //             posx = e.clientX + document.body.scrollLeft +
                //                 document.documentElement.scrollLeft;
                //             posy = e.clientY + document.body.scrollTop +
                //                 document.documentElement.scrollTop;
                //         }
                //         //console.log(posx, posy)
                //         return {
                //             x: posx,
                //             y: posy
                //         };
                //     }
                //     if ($scope.selected === block) {
                //         $scope.showcontextMenu = true;
                //         var menuPosition = getPosition();
                //         $scope.contextMenu = {};
                //         $scope.contextMenu.left = menuPosition.x;
                //         $scope.contextMenu.top = menuPosition.y;
                //         // console.log($scope.contextMenu);
                //     }
                // };

                $scope.removeCustomColor = function(block) {

                    var num = block.swatchnumber - 1;
                    var themeswatch = $scope.currenttheme.swatches[num]; //get swatch from theme
                    //console.log(block);
                    //block.swatch = themeswatch.swatch

                    if (block.swatchtype === 'text') {
                        //console.log('this is text', block.swatchtype);
                        block.swatch.text = themeswatch.swatch.fill;
                        block.swatch.border = 'transparent';
                        block.swatch.fill = 'transparent';
                        //console.log(block.swatch);
                    }
                    if (block.swatchtype !== 'text') {
                        block.swatch.text = themeswatch.swatch.text;
                        block.swatch.border = themeswatch.swatch.border;
                        block.swatch.fill = themeswatch.swatch.fill;
                    }

                    //console.log(theme);
                };

            },
            link: function(scope, el) {
                el.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.edittext = false;
                        event.preventDefault();
                    }
                });
                // el.bind('mousedown', function() {
                //     //e.stopPropagation();
                //     //console.log(e);
                //     //scope.selected = scope.block;
                //     scope.$root.selectedBlock = scope.block;
                //     console.log(scope.block);
                //     //scope.$root.changealignment(scope.block.text.verticalalignment, scope.block.text.horizontalalignment);
                //     scope.edittext = false;
                // });
                el.bind('contextmenu', function() {
                    scope.showcontextMenu = true;
                    scope.edittext = false;
                });
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showcontextMenu = false;
                        scope.edittext = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
                $document.on('contextmenu', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showcontextMenu = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    });