angular.module('lucidShapeGroup', ['appConfig'])
    .directive('lucidShapeGroup', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                shapes: '=',
                custom: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'shape-group/lucid-shape-group.html',
            controller: function($scope) {
                $scope.onDropComplete = function(data) {
                    //e.stopPropagation(); is there a way to stop this from happening on canvas? (shape manager)
                    if (data) {
                        var index = $scope.shapes.indexOf(data);
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
                            $scope.shapes.push(newblock);
                            //console.log("shape saved to shapegroup", newblock);
                        }
                    }
                };

                //from demo
                if ($scope.custom) {
                    $scope.dragEffect = 'copyMove';
                } else {
                    $scope.dragEffect = 'copy';
                }

                $scope.dragoverCallback = function(event, index) {
                    //$scope.logListEvent('dragged over', event, index, external, type);
                    return index; // < 10;
                };

                $scope.dropCallback = function(event, index, item, external, type, allowedType) {
                    //$scope.logListEvent('dropped at', event, index, external, type);
                    //console.log('dropped in saved shapes', item);
                    $scope.onDropComplete(item, event);
                    if (external) {
                        //console.log('external', item);
                        if (allowedType === 'true') {
                            return false;
                        }
                        //if (allowedType === 'containerType' && !angular.isArray(item)) return false;
                    }
                    //return item;
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
            },
        };
    })
    .animation('.slide-toggle', ['$animateCss', function($animateCss) {
        var lastId = 0;
        var _cache = {};

        function getId(el) {
            var id = el[0].getAttribute("data-slide-toggle");
            if (!id) {
                id = ++lastId;
                el[0].setAttribute("data-slide-toggle", id);
            }
            return id;
        }

        function getState(id) {
            var state = _cache[id];
            if (!state) {
                state = {};
                _cache[id] = state;
            }
            return state;
        }

        function generateRunner(closing, state, animator, element, doneFn) {
            return function() {
                state.animating = true;
                state.animator = animator;
                state.doneFn = doneFn;
                animator.start().finally(function() {
                    if (closing && state.doneFn === doneFn) {
                        element[0].style.height = '';
                    }
                    state.animating = false;
                    state.animator = undefined;
                    state.doneFn();
                });
            };
        }

        return {
            addClass: function(element, className, doneFn) {
                if (className === 'ng-hide') {
                    var state = getState(getId(element));
                    var height = (state.animating && state.height) ?
                        state.height : element[0].offsetHeight;

                    var animator = $animateCss(element, {
                        from: {
                            height: height + 'px',
                            opacity: 1
                        },
                        to: {
                            height: '0px',
                            opacity: 0
                        }
                    });
                    if (animator) {
                        if (state.animating) {
                            state.doneFn =
                                generateRunner(true,
                                    state,
                                    animator,
                                    element,
                                    doneFn);
                            return state.animator.end();
                        } else {
                            state.height = height;
                            return generateRunner(true,
                                state,
                                animator,
                                element,
                                doneFn)();
                        }
                    }
                }
                doneFn();
            },
            removeClass: function(element, className, doneFn) {
                if (className === 'ng-hide') {
                    var state = getState(getId(element));
                    var height = (state.animating && state.height) ?
                        state.height : element[0].offsetHeight;

                    var animator = $animateCss(element, {
                        from: {
                            height: '0px',
                            opacity: 0
                        },
                        to: {
                            height: height + 'px',
                            opacity: 1
                        }
                    });

                    if (animator) {
                        if (state.animating) {
                            state.doneFn = generateRunner(false,
                                state,
                                animator,
                                element,
                                doneFn);
                            return state.animator.end();
                        } else {
                            state.height = height;
                            return generateRunner(false,
                                state,
                                animator,
                                element,
                                doneFn)();
                        }
                    }
                }
                doneFn();
            }
        };
    }]);