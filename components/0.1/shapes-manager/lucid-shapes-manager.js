angular.module("lucidShapesManager", ['appConfig', 'lucidShapesData'])
    .directive('lucidShapesManager', function(config, shapesData, $document, $timeout) {
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: config.componentsURL + 'shapes-manager/lucid-shapes-manager.html',
            controller: function($scope, $rootScope, $window) {

                $scope.shapegroups = shapesData.all();

                $scope.clickShapes = function(){
                    if(!$scope.searchshapes){
                    $rootScope.manageshapes=!$rootScope.manageshapes
                    }
                    else{
                        $scope.searchshapes = false;
                    }
                }

                // $scope.pinnedgroups = shapesData.pinned();
                //$scope.customshapes = shapesData.custom();
                // $scope.manageShapes = function(){
                //     $rootScope.manageshapes=!$rootScope.manageshapes;
                //     console.log('manage');
                //     $timeout(function() {
                //         $scope.managingshapesopen = !$scope.managingshapesopen;
                //     }, 900);

                // }
                // $scope.visibleBlocks = function() {
                //     var elements = ($scope.scroll/200) +5;
                //     console.log($scope.scroll);
                //     return elements;
                // };

                $scope.newCustomGroup = function() {
                    var newGroup = {
                        "groupname": "New Group",
                        "custom": true,
                        "edit": true,
                        "shapes": [{
                            'fake': 'fake'
                        }],
                    };
                    shapesData.addGroup(newGroup);
                    //$scope.customshapes.splice(0, 0, newGroup);
                };
                $scope.editName = function(shapegroup, index) {
                    shapegroup.edit = true;
                    var elementID = 'name-input-' + index;
                    $timeout(function() {
                        document.getElementById(elementID).select();
                    }, 10);
                    shapegroup.edit = true;
                };
                
                $scope.pinnedCount = 5; //current loaded number of pinned libraries.

                $scope.pinGroup = function(shapegroup) {
                        var group = shapesData.get(shapegroup.id);
                        group.pinned = true;
                        
                        $scope.pinnedCount += 1; //always pin to bottom
                        shapegroup.pinnedOrder = $scope.pinnedCount;
                        //show message if not in display
                        $scope.showPinMessage(shapegroup);
                        console.log('pin');
                };
                $scope.unPinGroup = function(shapegroup) {
                    var group = shapesData.get(shapegroup.id);
                        group.pinned = false;
                        console.log('unpin');
                };
                $scope.togglePin = function(shapegroup){
                    var group = shapesData.get(shapegroup.id);
                    if(shapegroup.pinned){
                        $scope.unPinGroup(shapegroup);
                    }
                    else{
                        $scope.pinGroup(shapegroup);
                    }
                };
                $scope.showPinMessage = function(shapegroup){
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
                };
                $scope.openWindow = function(url) {
                    window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
                };

                //from demo
                $scope.dragoverCallback = function(event, index, external, type) {
                    $scope.logListEvent('dragged over', event, index, external, type);
                    // Disallow dropping in the third row. Could also be done with dnd-disable-if.
                    return index; // < 10;
                };

                $scope.dropCallback = function(event, index, item, external, type, allowedType) {
                    $scope.logListEvent('dropped at', event, index, external, type);
                    if (external) {
                        //if (allowedType === 'itemType' && !item.label) return false;
                        if (allowedType === 'containerType' && !angular.isArray(item)) return false;
                    }
                    return item;
                };

                $scope.logEvent = function(message, event) {
                    console.log(message, '(triggered by the following', event.type, 'event)');
                    console.log(event);
                };

                $scope.logListEvent = function(action, event, index, external, type) {
                    var message = external ? 'External ' : '';
                    message += type + ' element is ' + action + ' position ' + index;
                    $scope.logEvent(message, event);
                };


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
            controller: function($scope, $timeout){
                $scope.showOptions = function(){
                    $scope.importOptions = true;
                    //five second delay, then hide import options
                    $timeout(function() {
                        $scope.importOptions = false
                    }, 5000);
                }
            }
        };
    })
    .directive('scrollPosition', function($window) {
        return {
            scope: {
                scroll: '=scrollPosition'
            },
            link: function(scope, element, attrs) {
                var windowEl = angular.element($window);
                var handler = function() {
                    scope.scroll = $window.pageYOffset;
                }
                windowEl.on('scroll', scope.$apply.bind(scope, handler));
                //windowEl.on('scroll', console.log('scrolltop'));
                
                handler();
            }
        };
    });