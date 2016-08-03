angular.module('canvas', [])
    .controller('canvasCtrl', function($scope, $rootScope) {
        $scope.clickLine = function() {
            //alert('clicked');
            $rootScope.selectedType = 'line';
            //console.log('clicked');
        };
        $scope.lucidSlides = [{
            "x": 368,
            "y": 100,
            "height": 120,
            "width": 160
        }, {
            "x": 60,
            "y": 210,
            "height": 300,
            "width": 400
        }, {
            "x": 480,
            "y": 300,
            "height": 300,
            "width": 400
        }];
        $scope.blocks = $rootScope.currentPage.blocks;
        $rootScope.selectedType = 'nothing';
        $scope.deselectBlock = function() {
            var deselect = JSON.parse(JSON.stringify($rootScope.selectedBlock));
            deselect.table = false;
            $rootScope.selectedBlock = deselect;
            //console.log('deselectBlock');
        };

        /////// START DRAGGING SHAPES STUFF

        $scope.dragoverCallback = function(event, index, external, type) {
            $scope.logListEvent('dragged over canvas', event, index, external, type);
            // Disallow dropping in the third row. Could also be done with dnd-disable-if.
            return index < 10;
        };

        $scope.dropCallback = function(event, index, item, external, type, allowedType) {
            $scope.logListEvent('dropped at canvas', event, index, external, type);
            if (external) {
                if (allowedType === 'itemType' && !item.label) {
                    return false;
                }
                if (allowedType === 'containerType' && !angular.isArray(item)) {
                    return false;
                }
            }
            return item;
        };

        // $scope.logEvent = function(message, event) {
        //     console.log(message, '(triggered by the following', event.type, 'event)');
        //     console.log(event);
        // };

        // $scope.logListEvent = function(action, event, index, external, type) {
        //     var message = external ? 'External ' : '';
        //     message += type + ' element is ' + action + ' position ' + index;
        //     $scope.logEvent(message, event);
        // };

        /////// END DRAGGIN SHAPES STUFF

        $scope.dropToCanvas = function(item, event) {
            $rootScope.saveDocument();
            var index = $rootScope.currentPage.blocks.indexOf(item);

            if (index === -1 && item) {
                //if dragging shape with no metrics such as a star, etc.
                if (!item.metrics) {
                    item = {
                        "customcolor": false,
                        "swatch": {
                            "fill": "#ffffff",
                            "text": "#333333",
                            "border": "#666666"
                        },
                        "swatchnumber": 1,
                        "borderwidth": 3,
                        "borderstyle": "solid",
                        "text": {
                            "verticalalignment": "middle",
                            "horizontalalignment": "center",
                            "text": item.name,
                            "size": "12px"
                        },
                        "padding": 10,
                        "metrics": {
                            "z": 2,
                            "width": 120,
                            "height": 45
                        },
                        "shapepanel": false
                    };
                }
                //set the position based on where it dropped and the width of the block.
                var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;

                item.metrics.x = event.pageX - canvasX - (item.metrics.width / 2);
                item.metrics.y = event.pageY - canvasY - (item.metrics.height / 2);

                //console.log('shape', item, event.pageX, event.pageY, 'total: ', event);

                $rootScope.currentPage.blocks.push(item);
                $rootScope.selectedBlock = item;

            }

        };
        $scope.onDragSuccess = function(data, event) {
            //console.log(event);
            if (event.x > 250) {
                var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;
                //console.log('drag success', data, event);
                if (data) {
                    if (angular.element(event.event.srcElement).hasClass('lucid-block-comment')) {
                        //console.log('comment');
                        return;
                    }
                    data.metrics.x = event.x - canvasX - event.element.centerX;
                    data.metrics.y = event.y - canvasY - event.element.centerY;
                    data.shapepanel = false;
                }
            }
        };
    });