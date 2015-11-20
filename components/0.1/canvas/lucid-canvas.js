angular.module("lucidCanvas", ['appConfig'])
    .directive('lucidCanvas', function(config) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: config.componentsURL + 'canvas/lucid-canvas.html',
            controller: function($scope, $rootScope) {

                $scope.blocks = $rootScope.currentPage.blocks;

                $scope.dragoverCallback = function(event, index, external, type) {
                    //$scope.logListEvent('dragged over', event, index, external, type);
                    return index; // < 10;
                };

                $scope.dropCallback = function(event, index, item, external, type, allowedType) {
                    //$scope.logListEvent('dropped at', event, index, external, type);
                    console.log('dropped in saved shapes', item);
                    if (external) {
                        console.log('dropped in saved shapes', item);
                        if (allowedType === 'true') {
                            return false;
                        }
                        //if (allowedType === 'containerType' && !angular.isArray(item)) return false;
                    }
                    return item;
                };
                $scope.onDropComplete = function(data, event) {
                    if (data) {
                        var index = $rootScope.currentPage.blocks.indexOf(data);
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
            }
        };
    });