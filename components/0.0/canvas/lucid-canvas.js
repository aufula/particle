angular.module("lucidCanvas", ['appConfig'])
    .directive('lucidCanvas', function(config, canvasData) {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: config.componentsURL + 'canvas/lucid-canvas.html',
            controller: function($scope) {

                $scope.defaultBlock = {
                    "text": {
                        "verticalalignment": "middle",
                        "horizontalalignment": "center",
                        "text": "",
                        "size": "12px"
                    },
                    "swatch": {
                        "fill": "#FFFFFF",
                        "text": "#333",
                        "border": "#333"
                    },
                    "padding": 10,
                    "metrics": {
                        "z": 2,
                        "x": 390,
                        "y": 139,
                        "width": 120,
                        "height": 45
                    }
                };
                $scope.blockElements = canvasData;
                $scope.editThisBlock = function(block) {
                    $scope.selectedBlock = block;
                    //console.log(block.swatch);
                };
                $scope.onDropComplete = function(data, event) {
                    if (data && !$scope.manageShapes) {
                        var index = $scope.blockElements.indexOf(data);
                        //console.log('shape', index);
                        if (index === -1) {
                            var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                            var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;
                            //data.metrics = {};
                            //console.log(data, event);
                            data.metrics.x = event.x - canvasX - data.metrics.width / 2; //center block as it drops on canvas and expands
                            data.metrics.y = event.y - canvasY - data.metrics.height / 2;

                            var newblock = JSON.parse(JSON.stringify(data));
                            $scope.blockElements.push(newblock);
                            //console.log('dropped on canvas', newblock, 'current array', $scope.blockElements);
                        }

                    }

                };
                $scope.onDragSuccess = function(data, event) {
                    if (event.x > 250) {
                        var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                        var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;
                        //console.log('drag success', data, event);
                        if (data) {
                            data.metrics.x = event.x - canvasX - event.element.centerX;
                            data.metrics.y = event.y - canvasY - event.element.centerY;
                            data.shapepanel = false;
                        }
                    }
                    // if (event.x < 220) {
                    //     console.log('dropped in shapes'); //not sure how else to fix this.
                    // }
                    //console.log(data.metrics.x, data.metrics.y);
                    //console.log('drag success');
                };
                $scope.savedStyles = [];
                $scope.addSavedStyle = function(block) {
                    var savethis = {
                        "fill": block.swatch.fill,
                        "text": block.swatch.text,
                        "border": block.swatch.border
                    };
                    $scope.savedStyles.push(savethis);
                    //console.log(savethis);
                };
                $scope.lucidBackgroundColor = '#FFF';
                $scope.switchTheme = function(theme) {
                    $scope.lucidBackgroundColor = theme.pagecolor;
                    $scope.lucidLineColor = theme.linecolor;

                    angular.forEach($scope.blockElements, function(block) {
                        if (block) {
                            if (block.customcolor) {
                                return;
                            }
                            var num = block.swatchnumber - 1;
                            var themeswatch = theme.swatches[num]; //get swatch from theme
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
                        }
                    });
                    //console.log(theme);
                };
                $scope.lucidLineColor = "#999999";
                $scope.lucidLines = [{
                    "points": "450 184 450 240",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "450 184 450 213 217 213 217 240",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "450 184 450 213 686 213 686 240",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "217 290 217 313 135 313 135 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "217 290 217 313 260 313 260 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "217 290 217 313 388 313 388 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "686 290 686 313 622 313 622 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "686 290 686 313 747 313 747 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "260 380 260 402 193 402 193 420",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "260 380 260 402 320 402 320 420",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "622 380 622 420",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "622 380 622 402 747 402 747 420",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "622 470 622 510",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "6 78 894 78",
                    "width": 1
                }, {
                    "points": "6 616 894 616",
                    "width": 1
                }, {
                    "points": "6 659 894 659",
                    "width": 1
                }];
            }
        };
    });