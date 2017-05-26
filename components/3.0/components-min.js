/*global angular : true fixes codekit error*/

//include Components js
//@codekit-append "input/lucid-input.js"
//@codekit-append "input-stepper/lucid-input-stepper.js"
//@codekit-append "color-picker/lucid-color-picker.js"
//@codekit-append "more-drawer/lucid-more-drawer.js"
//@codekit-append "modal/lucid-modal.js"
//@codekit-append "finger-tabs/lucid-finger-tabs.js"
//@codekit-append "buttcon-popover/lucid-buttcon-popover.js"
//@codekit-append "collapse-bar/lucid-collapse-bar.js"
//@codekit-append "buttcon/lucid-buttcon.js"
//@codekit-append "notification/lucid-notification.js"
//@codekit-append "select/lucid-select.js"
//@codekit-append "button/lucid-button.js"
//@codekit-append "context-menu/lucid-context-menu.js"
//@codekit-append "toggle/lucid-toggle.js"
//@codekit-append "edit-in-place/lucid-edit-in-place.js"
//@codekit-append "top-tabs/lucid-top-tabs.js"
//@codekit-append "tip/lucid-tip.js"
//@codekit-append "paywall/lucid-paywall.js"
//@codekit-append "progress-stepper/lucid-progress-stepper.js"


angular.module('appConfig', [])

.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://lucidsoftware.github.io/particle/components/**',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/**'
    ]);
}])

.constant("config", {
    //'componentsURL': "/components/3.0/" //local dev
    'componentsURL': "https://lucidsoftware.github.io/particle/components/3.0/" //github

});

angular.module("lucidComponents", ['ngAnimate', 'appConfig', 'lucidInputStepper', 'lucidButtconPopover', 'lucidColorPicker', 'lucidMoreDrawer', 'lucidModal', 'lucidFingerTabs', 'lucidButtcon', 'lucidNotification', 'lucidSelect', 'lucidInput', 'lucidButton', 'lucidCollapseBar', 'lucidContextMenu', 'lucidToggle', 'editInPlace','lucidTopTabs', 'lucidTip', 'lucidPaywall', 'lucidProgressStepper'])

////////////////////      REUSABLE DIRECTIVES      //////////////////////
//hit enter key
.directive('ngEnter', [function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
}])

//hit escape key
.directive('escKey', [function() {
    return function(scope, element, attrs) {
        element.bind('keydown keypress', function(event) {
            if (event.which === 27) { // 27 = esc key
                scope.$apply(function() {
                    scope.$eval(attrs.escKey);
                });

                event.preventDefault();
            }
        });
    };
}])

//right click
.directive('ngRightClick', ['$parse', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {
                    $event: event
                });
            });
        });
    };
}])


//click outside element
.directive('clickOutside', ['$document', function($document) {
    return {
        restrict: 'A',
        scope: {
            clickOutside: '&'
        },
        link: function(scope, el) {

            $document.on('click', function(e) {
                if (el !== e.target && !el[0].contains(e.target)) {
                    scope.$apply(function() {
                        scope.$eval(scope.clickOutside);
                    });
                }
            });
        }
    };
}])

//this is for the select on load when you create a new shape library
.directive('selectOnLoad', ['$timeout', function($timeout) {
    // Linker function
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function() {
                element[0].select();
            });
        }
    };
}])

////////////////////      Filters      //////////////////////

//filter used to send svgs as html
.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
}])

///////////////////      Animations      //////////////////////


//this is used with lucid-collapse-bar
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
                if (!closing && state.doneFn === doneFn) {
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

angular.module('lucidInput', ['appConfig'])
    .directive('lucidInput', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                unit: '@',
                value: '=',
                width:'@',
                label: '@',
                placeholder:'@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'input/lucid-input.html',
        };
    }]);

angular.module('lucidInputStepper', ['appConfig'])
    .directive('lucidInputStepper', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                unit: '@',
                step: '@',
                number: '=',
                width: '@',
                label: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'input-stepper/lucid-input-stepper.html',
            controller: ['$scope', '$interval', function($scope, $interval) {
                            var $promise = null;
            
                            $scope.$watch('number + unit', function(newValue) {
                                $scope.stepperinput = newValue;
                            });
            
                            $scope.removeText = function() {
                                var text = $scope.stepperinput;
                                //removing text keeping decimal
                                $scope.number = text.replace(/[^0-9.]/g, "");
                            };
            
                            $scope.updateInput = function() {
                                $scope.removeText();
                                $scope.number = Number($scope.number);
                                $scope.stepperinput = $scope.number + $scope.unit;
                            };
                            $scope.stepUp = function() {
                                //first step up instantly on click
            
                                $scope.removeText();
                                $scope.number = Number($scope.number) + Number($scope.step);
                                $scope.stepperinput = $scope.number + $scope.unit;
                                //then continually step up if still holding.
                                $promise = $interval(function() {
                                    $scope.removeText();
                                    $scope.number = Number($scope.number) + Number($scope.step);
                                    $scope.stepperinput = $scope.number + $scope.unit;
            
                                }, 100);
            
                            };
                            $scope.stepDown = function() {
            
                                //first step down instantly on click
                                $scope.removeText();
                                if ($scope.number < 1) {
                                    //console.log('zero');
                                    return;
                                }
                                $scope.number = Number($scope.number) + Number(-$scope.step);
                                $scope.stepperinput = $scope.number + $scope.unit;
                                //then continually step down if still holding.
                                $promise = $interval(function() {
            
                                    $scope.removeText();
                                    if ($scope.number < 1) {
                                        //console.log('zero');
                                        return;
                                    }
                                    $scope.number = Number($scope.number) + Number(-$scope.step);
                                    $scope.stepperinput = $scope.number + $scope.unit;
            
                                }, 100);
                            };
                            $scope.mouseUp = function() {
                                if ($promise) {
                                    $interval.cancel($promise);
                                }
                            };
                        }],
            compile: function(el, attrs) {
                if (!attrs.step) {
                    attrs.step = 1;
                }
                if (!attrs.unit) {
                    attrs.unit = "";
                }
                if(!attrs.number){
                    attrs.number = "0";
                }
            }
        };
    }]);

/*global angular : true fixes codekit error*/
angular.module("lucidColorPicker", ['appConfig'])
    .directive('lucidColorPicker', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '=',
            },
            replace: false,
            templateUrl: config.componentsURL + 'color-picker/lucid-color-picker.html',

            controller: ['$scope', function($scope) {
                $scope.swatchpanel = 'Fill';
                $scope.showColorDrawer = false;
            }]
        };
    }])
    .directive('lucidColorPickerOptions', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                color: '=',
            },
            templateUrl: config.componentsURL + 'color-picker/lucid-color-picker-options.html',
            controller: ['$scope', function($scope) {
                $scope.lucidcolorpickergrayscale = [{
                    "hex": "#FFFFFF",
                }, {
                    "hex": "#E5E5E5",
                }, {
                    "hex": "#CCCCCC",
                }, {
                    "hex": "#B2B2B2",
                }, {
                    "hex": "#999999",
                }, {
                    "hex": "#666666",
                }, {
                    "hex": "#333333",
                }, {
                    "hex": "#000000",
                }];
                $scope.lucidcolorpickercolors = [{
                    "hex": "#d1bcd2"
                }, {
                    "hex": "#f9d2de"
                }, {
                    "hex": "#ffbbb1"
                }, {
                    "hex": "#ffdba9"
                }, {
                    "hex": "#ffeca9"
                }, {
                    "hex": "#c7e8ac"
                }, {
                    "hex": "#99d5ca"
                }, {
                    "hex": "#c1e4f7"
                }, {
                    "hex": "#b2d6ef"
                }, {
                    "hex": "#b391b5"
                }, {
                    "hex": "#f5b5c8"
                }, {
                    "hex": "#ff8f80"
                }, {
                    "hex": "#ffc374"
                }, {
                    "hex": "#ffdf71"
                }, {
                    "hex": "#a3d977"
                }, {
                    "hex": "#5abaa7"
                }, {
                    "hex": "#99d2f2"
                }, {
                    "hex": "#83bbe5"
                }, {
                    "hex": "#834187"
                }, {
                    "hex": "#de5f85"
                }, {
                    "hex": "#c92d39"
                }, {
                    "hex": "#ef8d22"
                }, {
                    "hex": "#fcc438"
                }, {
                    "hex": "#7ab648"
                }, {
                    "hex": "#19967d"
                }, {
                    "hex": "#3aa6dd"
                }, {
                    "hex": "#0c7cba"
                }];

            }]
        };
    }]);

angular.module("lucidMoreDrawer", ['appConfig'])
    .directive('lucidMoreDrawer', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                showdrawer: '=',
                height: '@',
                tophandle: '@',
                more: '@',
                less:'@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'more-drawer/lucid-more-drawer.html',
            compile: function(element, attrs) {
                if (!attrs.more){
                    attrs.more = 'More';
                }
                if (!attrs.less){
                    attrs.less = 'Less';
                }
            }
        };
    }]); 

angular.module("lucidModal", ['appConfig'])
    .directive('lucidModal', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                showmodal: '=',
                width: '@',
                height: '@',
                title: '@',
                confirm: '@',
                cancel: '@',
                icon: '@',
                confirmFunction: '&'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'modal/lucid-modal.html',
            controller: ['$scope', function($scope){
                if($scope.confirm){
                    $scope.footerHeight = 49;
                }
                else{
                    $scope.footerHeight = 0;
                }
            }],
            compile: function(el, attrs) {
                if (!attrs.width) {
                    attrs.width = 590;
                }
                if (!attrs.height) {
                    attrs.height = 460;
                }
            }
        };
    }]);

angular.module("lucidFingerTabs", ['appConfig'])
    .directive('lucidFingerTabs', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'finger-tabs/lucid-finger-tabs.html',
            scope: {
                selectedTab: '='
            },
            transclude: true,
            controller: ['$scope', function($scope) {
                $scope.tabs = [];

                this.addTab = function(tab) {
                    $scope.tabs.push(tab);
                };

                $scope.$watch('selectedTab', function(newVal) {
                    for (var i = 0; i < $scope.tabs.length; i++) {
                        if (i !== newVal) {
                            $scope.tabs[i].selected = false;
                        } else {
                            $scope.tabs[i].selected = true;
                            //console.log('selected', i);
                        }
                    }
                });
            }]
        };
    }])
    .directive('lucidFingerTab', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'finger-tabs/lucid-finger-tab.html',
            transclude: true,
            replace: true,
            scope: {
                name: '@name',
                icon: '@icon',
            },
            require: '^lucidFingerTabs',
            link: function(scope, element, attrs, ctrl) {
                scope.selected = attrs.selected === "" || attrs.selected === true;
                ctrl.addTab(scope);
            }
        };
    }]);

angular.module("lucidButtconPopover", ['appConfig'])
    .directive('lucidButtconPopover', ['config', function(config) {
            return {
                restrict: 'E',
                scope: {
                    icon: '@',
                    width: '@',
                    showpopover: '='
                },
                replace: true,
                transclude: true,
                templateUrl: config.componentsURL + 'buttcon-popover/lucid-buttcon-popover.html',
            };
        }]);

angular.module('lucidCollapseBar', ['appConfig'])
    .directive('lucidCollapseBar', ['config', function(config) {
            return {
                restrict: 'E',
                scope: {
                    title: '@',
                    closed: '@'
                },
                replace: true,
                transclude: true,
                templateUrl: config.componentsURL + 'collapse-bar/lucid-collapse-bar.html',
            };
        }])
    .animation('.lucid-collapse-bar-content', ['$animateCss', function($animateCss) {
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
                    if (!closing && state.doneFn === doneFn) {
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

angular.module("lucidButtcon", ['appConfig'])
    .directive('lucidButtcon', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                icon: '@',
                label: '@',
                active: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'buttcon/lucid-buttcon.html',
        };
    }]);

angular.module("lucidNotification", ['appConfig'])
    .directive('lucidNotification', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                type: '@',
                button: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'notification/lucid-notification.html',
        };
    }]); 

angular.module("lucidSelect", ['appConfig'])
    .directive('lucidSelect', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                selectedOption: '=ngModel',
                options: '=',
                width: '@',
                label: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'select/lucid-select.html',

            controller: ['$scope', function($scope) {
                if (!$scope.selectedOption) {
                    //if ng-model isn't set, set selectedOption to first value in array
                    $scope.selectedOption = $scope.options[0];
                }
            }]
        };
    }]);

angular.module("lucidButton", ['appConfig'])
    .directive('lucidButton', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                color: '@',
                icon: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'button/lucid-button.html',
        };
    }]);

angular.module("lucidContextMenu", ['appConfig'])
    .factory('ContextMenuService', [function() {
        return {
            element: null,
            menuElement: null
        };
    }])
    .directive('lucidContextMenu', [
        '$document',
        'ContextMenuService',
        function($document, ContextMenuService) {
            return {
                restrict: 'A',
                scope: {
                    'callback': '&lucidContextMenu',
                    'disabled': '&contextMenuDisabled',
                    'closeCallback': '&lucidContextMenuClose'
                },
                link: function($scope, $element, $attrs) {
                    var opened = false;

                    function open(event, menuElement) {
                        menuElement.removeClass('ng-hide');

                        var doc = $document[0].documentElement;
                        var docLeft = (window.pageXOffset || doc.scrollLeft) -
                            (doc.clientLeft || 0),
                            docTop = (window.pageYOffset || doc.scrollTop) -
                            (doc.clientTop || 0),
                            elementWidth = menuElement[0].scrollWidth,
                            elementHeight = menuElement[0].scrollHeight;
                        var docWidth = doc.clientWidth + docLeft,
                            docHeight = doc.clientHeight + docTop,
                            totalWidth = elementWidth + event.pageX,
                            totalHeight = elementHeight + event.pageY,
                            left = Math.max(event.pageX - docLeft, 0),
                            top = Math.max(event.pageY - docTop, 0);

                        if (totalWidth > docWidth) {
                            left = left - (totalWidth - docWidth);
                        }

                        if (totalHeight > docHeight) {
                            top = top - (totalHeight - docHeight);
                        }

                        menuElement.css('top', top + 'px');
                        menuElement.css('left', left + 'px');
                        opened = true;
                    }

                    function close(menuElement) {
                        menuElement.addClass('ng-hide');

                        if (opened) {
                            $scope.closeCallback();
                        }

                        opened = false;
                    }

                    $element.bind('contextmenu', function(event) {
                        if (!$scope.disabled()) {
                            if (ContextMenuService.menuElement !== null) {
                                close(ContextMenuService.menuElement);
                            }
                            ContextMenuService.menuElement = angular.element(
                                document.getElementById($attrs.target)
                            );
                            ContextMenuService.element = event.target;
                            //console.log('set', ContextMenuService.element);

                            event.preventDefault();
                            event.stopPropagation();
                            $scope.$apply(function() {
                                $scope.callback({
                                    $event: event
                                });
                            });
                            $scope.$apply(function() {
                                open(event, ContextMenuService.menuElement);
                            });
                        }
                    });

                    function handleKeyUpEvent(event) {
                        //console.log('keyup');
                        if (!$scope.disabled() && opened && event.keyCode === 27) {
                            $scope.$apply(function() {
                                close(ContextMenuService.menuElement);
                            });
                        }
                    }

                    function handleClickEvent(event) {
                        if (!$scope.disabled() &&
                            opened &&
                            (event.button !== 2 ||
                                event.target !== ContextMenuService.element)) {
                            $scope.$apply(function() {
                                close(ContextMenuService.menuElement);
                            });
                        }
                    }

                    $document.bind('keyup', handleKeyUpEvent);
                    // Firefox treats a right-click as a click and a contextmenu event
                    // while other browsers just treat it as a contextmenu event
                    $document.bind('click', handleClickEvent);
                    $document.bind('contextmenu', handleClickEvent);

                    $scope.$on('$destroy', function() {
                        //console.log('destroy');
                        $document.unbind('keyup', handleKeyUpEvent);
                        $document.unbind('click', handleClickEvent);
                        $document.unbind('contextmenu', handleClickEvent);
                    });
                }
            };
        }
    ]);

angular.module('lucidToggle', ['appConfig'])
    .directive('lucidToggle', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                toggle: '=',
                activetext: '@',
                inactivetext: '@',
                label: '@',
                width: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'toggle/lucid-toggle.html',
            compile: function(element, attrs) {
                if (!attrs.width) {
                    attrs.width = 40;
                }

                if (!attrs.activetext) {
                    attrs.activetext = 'ON';
                }

                if (!attrs.inactivetext) {
                    attrs.inactivetext = 'OFF';
                }
            }
        };
    }]);

angular.module('editInPlace', ['appConfig'])
    .directive('editInPlace', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                editableText: '=ngModel',
                placeholder: '@',
                edit: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'edit-in-place/lucid-edit-in-place.html',
            controller: ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {
                $scope.$watch('edit', function() {
                    $scope.selectInput();
                });
                $scope.selectInput = function() {
                    var input = $element[0].getElementsByTagName('input')[0];
                    $timeout(function() {
                        input.select();
                    }, 10);
                    //console.log('Focus This', input, 'model', $scope.editableText);

                };
            }]
        };
    }]);

angular.module("lucidTopTabs", ['appConfig'])
.directive('lucidTopTabs', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'top-tabs/lucid-top-tabs.html',
            scope: { 
                selectedTab: '='
            },
            transclude: true,
            controller: ['$scope', function($scope) {
                $scope.tabs = [];

                this.addTab = function(tab) {
                    $scope.tabs.push(tab);
                };

                $scope.$watch('selectedTab', function(newVal) {
                    for (var i = 0; i < $scope.tabs.length; i++) {
                        if (i !== newVal) {
                            $scope.tabs[i].selected = false;
                        } else {
                            $scope.tabs[i].selected = true;
                            //console.log('selected', i);
                        }
                    }
                });
            }]
        };
    }])
    .directive('lucidTopTab', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'top-tabs/lucid-top-tab.html',
            transclude: true,
            replace: true,
            scope: {
                name: '@name',
            },
            require: '^lucidTopTabs',
            link: function(scope, element, attrs, ctrl) {
                scope.selected = attrs.selected === "" || attrs.selected === true;
                ctrl.addTab(scope);
            }
        };
    }]);

angular.module("lucidTip", ['appConfig'])
    .directive('lucidTip', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                caret: '@',
                dismiss: '=',
                showtip: '='
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'tip/lucid-tip.html',
            compile: function(el, attrs) {
                if (!attrs.caret) {
                    attrs.caret = 'left';
                }
            }
        };
    }]);

angular.module("lucidPaywall", ['appConfig'])
    .directive('lucidPaywall', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                showpaywall: '=',
                title: '@',
                subtitle: '@',
                confirm: '@',
                cancel: '@',
                banner: '@',
                confirmFunction: '&'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'paywall/lucid-paywall.html',
            compile: function(el, attrs) {
                if (!attrs.banner) {
                    attrs.banner = 'PREMIUM';
                }
            }
        };
    }]);

angular.module("lucidProgressStepper", ['appConfig'])
    .directive('lucidProgressStepper', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'progress-stepper/lucid-progress-stepper.html',
            scope: {
                selectedStep: '='
            },
            transclude: true,
            controller: ['$scope', function($scope) {
                $scope.steps = [];

                this.addStep = function(step) {
                    $scope.steps.push(step);
                };

                $scope.$watch('selectedStep', function(newVal) {
                    //console.log('selected', newVal);
                    for (var i = 0; i < $scope.steps.length; i++) {
                        if (i !== newVal) {
                            $scope.steps[i].selected = false;
                        } else {
                            $scope.steps[i].selected = true;
                            //console.log('selected', i);
                        }
                    }
                });
            }]
        };
    }])
    .directive('lucidProgressStep', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'progress-stepper/lucid-progress-stepper-step.html',
            transclude: true,
            replace: true,
            scope: {
                name: '@name',
            },
            require: '^lucidProgressStepper',
            link: function(scope, element, attrs, ctrl) {
                scope.selected = attrs.selected === "" || attrs.selected === true;
                ctrl.addStep(scope);
            }
        };
    }]);

