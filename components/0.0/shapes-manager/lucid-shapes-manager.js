angular.module("lucidShapesManager", ['appConfig', 'lucidShapesData'])
    .directive('lucidShapesManager', function(config, shapesData, $document, $timeout) {
        return {
            restrict: 'E',
            scope: {
                selected: '=',
                manageshapes: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'shapes-manager/lucid-shapes-manager.html',
            controller: function($scope) {

                $scope.shapegroups = shapesData.all();
                // $scope.pinnedgroups = shapesData.pinned();
                $scope.customshapes = shapesData.custom();
                
                $scope.newCustomGroup = function() {
                    var newGroup = {
                        "groupname": "New Group",
                        "custom": true,
                        "edit": true,
                        "shapes": [],
                    };
                    $scope.customshapes.splice(0, 0, newGroup);
                };
                $scope.editName = function(shapegroup, index) {
                    //console.log(shapegroup, index);
                    shapegroup.edit = true;
                    var elementID = 'name-input-' + index;
                    $timeout(function() {
                        document.getElementById(elementID).select();
                    }, 10);

                };
                $scope.pinnedCount = 5; //used to always pin to bottom
                $scope.pinGroup = function(shapegroup) {
                    if (!shapegroup.pinned) {
                        //always pin to bottom
                        $scope.pinnedCount += 1;
                        shapegroup.pinnedOrder = $scope.pinnedCount;

                        //pin shape
                        shapegroup.pinned = !shapegroup.pinned;

                        //add message
                        var overflow = document.getElementById('left-panel-shapes').offsetHeight < document.getElementById('left-panel-shapes-scroll').offsetHeight;
                        //console.log('overflow: ', overflow)
                        if (overflow) {
                            $scope.overflowMessage = true;
                            $scope.overflowMessageTitle = shapegroup.groupname;
                            $timeout(function() {
                                $scope.overflowMessage = false;
                            }, 2000);
                        }
                    } else {
                        shapegroup.pinned = false;
                    }
                };
                $scope.openWindow = function(url) {
                    window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
                };

                //from demo
                // $scope.dragoverCallback = function(event, index, external, type) {
                //     $scope.logListEvent('dragged over', event, index, external, type);
                //     // Disallow dropping in the third row. Could also be done with dnd-disable-if.
                //     return index; // < 10;
                // };

                // $scope.dropCallback = function(event, index, item, external, type, allowedType) {
                //     $scope.logListEvent('dropped at', event, index, external, type);
                //     if (external) {
                //         //if (allowedType === 'itemType' && !item.label) return false;
                //         if (allowedType === 'containerType' && !angular.isArray(item)) return false;
                //     }
                //     return item;
                // };

                // $scope.logEvent = function(message, event) {
                //     console.log(message, '(triggered by the following', event.type, 'event)');
                //     console.log(event);
                // };

                // $scope.logListEvent = function(action, event, index, external, type) {
                //     var message = external ? 'External ' : '';
                //     message += type + ' element is ' + action + ' position ' + index;
                //     $scope.logEvent(message, event);
                // };


            }
        };
    })
    .directive('lucidShapeGroupManage', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                shapes: '=',
                custom: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'shapes-manager/lucid-shape-group-manage.html',
            controller: function($scope) {
                //from demo
                if ($scope.custom) {
                    $scope.dragEffect = 'copyMove';
                } else {
                    $scope.dragEffect = 'copy';
                }

                $scope.shapecount = 30;
                $scope.shapeCount = function(showdrawer) {
                    if (showdrawer) {
                        $scope.shapecount = 300;
                    } else {
                        $scope.shapecount = 30;
                    }
                    // console.log(showdrawer, 'ran');
                };
                $scope.dragoverCallback = function(event, index, external, type) {
                    //$scope.logListEvent('dragged over', event, index, external, type);
                    return index; // < 10;
                };

                $scope.dropCallback = function(event, index, item, external, type, allowedType) {
                    //$scope.logListEvent('dropped at', event, index, external, type);
                    if (external) {
                        if (allowedType === 'shape') {
                            return false;
                        }
                        //if (allowedType === 'containerType' && !angular.isArray(item)) return false;
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
            }
        };
    })
    .directive('selectOnLoad', function($timeout) {
        // Linker function
        return {
            restrict: 'A',
            link: function(scope, element) {
                $timeout(function() {
                    element[0].select();
                });
            }
        };
    })
    .directive('lucidImportOptions', function(config) {
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: config.componentsURL + 'shapes-manager/lucid-import-options.html',
        };
    });