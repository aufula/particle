/*global angular*/

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
//@codekit-append "button-dropdown/lucid-button-dropdown.js"
//@codekit-append "search/lucid-search.js"
//@codekit-append "slider/lucid-slider.js"
//@codekit-append "tooltip/lucid-tooltip.js"
//@codekit-append "growl/lucid-growl.js"
//@codekit-append "dynamic-height-hide/dynamic-height-hide.js"


angular.module('appConfig', [])

.config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://particle.golucid.co/components/**',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/**'
    ]);
}])

.constant("config", {
    //'componentsURL': "/components/4.0/" //local dev
    'componentsURL': "http://particle.golucid.co/components/4.0/" //github

});

angular.module("lucidComponents", ['ngAnimate', 'appConfig', 'lucidInputStepper', 'lucidButtconPopover', 'lucidColorPicker', 'lucidMoreDrawer', 'lucidModal', 'lucidFingerTabs', 'lucidButtcon', 'lucidNotification', 'lucidSelect', 'lucidInput', 'lucidButton', 'lucidCollapseBar', 'lucidContextMenu', 'lucidToggle', 'editInPlace','lucidTopTabs', 'lucidTip', 'lucidPaywall', 'lucidProgressStepper', 'lucidButtonDropdown', 'lucidSearch', 'lucidSlider', '720kb.tooltips', 'lucidGrowl', 'dynamicHeightHide'])

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
}]);

angular.module('lucidInput', ['appConfig'])
    .directive('lucidInput', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                unit: '@',
                value: '=?ngModel',
                width:'@',
                label: '@',
                placeholder:'@',
                disabled: '@'
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
                number: '=?ngModel',
                width: '@',
                label: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'input-stepper/lucid-input-stepper.html',
            controller: ['$scope', '$interval', function($scope, $interval) {
                var $promise = null;
                $scope.$watch('number + unit', function() {
                    if ($scope.unit !== '%') {
                        $scope.stepperinput = $scope.number + ' ' + $scope.unit;
                    }
                    else{
                        $scope.stepperinput = $scope.number + $scope.unit;
                    }
                });

                $scope.removeText = function() {
                    var text = $scope.stepperinput;
                    //removing text keeping decimal
                    $scope.number = text.replace(/[^0-9.]/g, "");
                };

                $scope.updateInput = function() {
                    $scope.removeText();
                    $scope.number = Number($scope.number);
                };
                $scope.stepUp = function() {
                    //first step up instantly on click

                    $scope.removeText();
                    $scope.number = Number($scope.number) + Number($scope.step);
                    //then continually step up if still holding.
                    $promise = $interval(function() {
                        $scope.removeText();
                        $scope.number = Number($scope.number) + Number($scope.step);


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
                    //then continually step down if still holding.
                    $promise = $interval(function() {

                        $scope.removeText();
                        if ($scope.number < 1) {
                            //console.log('zero');
                            return;
                        }
                        $scope.number = Number($scope.number) + Number(-$scope.step);

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
                if (!attrs.number) {
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
                selected: '=?',
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
                showdrawer: '=?',
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
                showmodal: '=?',
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
                selectedTab: '=?'
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
                    showpopover: '=?'
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
                active: '@',
                badge: '@'
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
                selectedOption: '=?ngModel',
                options: '=?',
                width: '@',
                label: '@'
            },
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
                icon: '@',
                color: '@',
                text: '@'
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
                width: '@',
                disabled: '@',
                longLabel: '@'
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
                editableText: '=?ngModel',
                placeholder: '@',
                edit: '=?'
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
                selectedTab: '=?'
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
                dismiss: '=?',
                showtip: '=?',
                width: '@',
                color: '@'
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
                showpaywall: '=?',
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
                selectedStep: '=?'
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

angular.module("lucidButtonDropdown", ['appConfig'])
    .directive('lucidButtonDropdown', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                text: '@',
                color: '@',
                side: '@'
            },
            transclude: true,
            templateUrl: config.componentsURL + 'button-dropdown/lucid-button-dropdown.html',
        };
    }]);

angular.module('lucidSearch', ['appConfig'])
    .directive('lucidSearch', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                value: '=?ngModel',
                width: '@',
                label: '@',
                placeholder: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'search/lucid-search.html',
        };
    }]);

angular.module('lucidSlider', ['appConfig'])
    .directive('lucidSlider', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                slider: '=?ngModel',
                width:'@',
                label: '@',
                min:'@',
                max:'@',
                unit:'@',
                step: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'slider/lucid-slider.html',
            compile: function(el, attrs) {
                if (!attrs.step) {
                    attrs.step = 1;
                }
                if (!attrs.unit) {
                    attrs.unit = "";
                }
                if (!attrs.slider) {
                    attrs.slider = "0";
                }
            }
        };
    }]);

/*
 * angular-tooltips
 * 1.1.7
 * 
 * Angular.js tooltips module.
 * http://720kb.github.io/angular-tooltips
 * 
 * MIT license
 * Wed Aug 31 2016
 */
/*global angular,window*/
(function withAngular(angular, window) {
    'use strict';

    var directiveName = 'tooltips',
        resizeObserver = (function resizeObserver() {

            var callbacks = [],
                lastTime = 0,
                runCallbacks = function runCallbacks(currentTime) {

                    if (currentTime - lastTime >= 15) {

                        callbacks.forEach(function iterator(callback) {

                            callback();
                        });
                        lastTime = currentTime;
                    } else {

                        window.console.log('Skipped!');
                    }
                },
                resizeTimeout, resize = function resize() {
                    window.clearTimeout(resizeTimeout);
                    resizeTimeout = window.setTimeout(function onResizeTimeout() {
                        window.requestAnimationFrame(runCallbacks);
                    }, 500);
                },
                addCallback = function addCallback(callback) {

                    if (callback) {

                        callbacks.push(callback);
                    }
                };

            return {
                'add': function add(callback) {

                    if (!callbacks.length) {

                        window.addEventListener('resize', resize);
                    }
                    addCallback(callback);
                },
                'remove': function remove() {
                    if (!callbacks.length) {
                        window.clearTimeout(resizeTimeout);
                        window.removeEventListener('resize', resize);
                    }
                }
            };
        }()),
        getAttributesToAdd = function getAttributesToAdd(element) {
            var attributesToAdd = {};

            element.removeAttr(directiveName);
            if (element.attr('tooltip-template') !== undefined) {

                attributesToAdd['tooltip-template'] = element.attr('tooltip-template');
                element.removeAttr('tooltip-template');
            }

            if (element.attr('tooltip-template-url') !== undefined) {

                attributesToAdd['tooltip-template-url'] = element.attr('tooltip-template-url');
                element.removeAttr('tooltip-template-url');
            }

            if (element.attr('tooltip-template-url-cache') !== undefined) {

                attributesToAdd['tooltip-template-url-cache'] = element.attr('tooltip-template-url-cache');
                element.removeAttr('tooltip-template-url-cache');
            }

            if (element.attr('tooltip-controller') !== undefined) {

                attributesToAdd['tooltip-controller'] = element.attr('tooltip-controller');
                element.removeAttr('tooltip-controller');
            }

            if (element.attr('tooltip-side') !== undefined) {

                attributesToAdd['tooltip-side'] = element.attr('tooltip-side');
                element.removeAttr('tooltip-side');
            }

            if (element.attr('tooltip-show-trigger') !== undefined) {

                attributesToAdd['tooltip-show-trigger'] = element.attr('tooltip-show-trigger');
                element.removeAttr('tooltip-show-trigger');
            }

            if (element.attr('tooltip-hide-trigger') !== undefined) {

                attributesToAdd['tooltip-hide-trigger'] = element.attr('tooltip-hide-trigger');
                element.removeAttr('tooltip-hide-trigger');
            }

            if (element.attr('tooltip-smart') !== undefined) {

                attributesToAdd['tooltip-smart'] = element.attr('tooltip-smart');
                element.removeAttr('tooltip-smart');
            }

            if (element.attr('tooltip-class') !== undefined) {

                attributesToAdd['tooltip-class'] = element.attr('tooltip-class');
                element.removeAttr('tooltip-class');
            }

            if (element.attr('tooltip-close-button') !== undefined) {

                attributesToAdd['tooltip-close-button'] = element.attr('tooltip-close-button');
                element.removeAttr('tooltip-close-button');
            }

            if (element.attr('tooltip-size') !== undefined) {

                attributesToAdd['tooltip-size'] = element.attr('tooltip-size');
                element.removeAttr('tooltip-size');
            }

            if (element.attr('tooltip-speed') !== undefined) {

                attributesToAdd['tooltip-speed'] = element.attr('tooltip-speed');
                element.removeAttr('tooltip-speed');
            }

            return attributesToAdd;
        },
        getStyle = function getStyle(anElement) {

            if (window.getComputedStyle) {

                return window.getComputedStyle(anElement, '');
            } else if (anElement.currentStyle) {

                return anElement.currentStyle;
            }
        },
        getAppendedTip = function getAppendedTip(theTooltipElement) {
            var tipsInBody = window.document.querySelectorAll('._exradicated-tooltip'),
                aTipInBody, tipsInBodyIndex = 0,
                tipsInBodyLength = tipsInBody.length,
                angularizedElement;

            for (; tipsInBodyIndex < tipsInBodyLength; tipsInBodyIndex += 1) {

                aTipInBody = tipsInBody.item(tipsInBodyIndex);
                if (aTipInBody) {

                    angularizedElement = angular.element(aTipInBody);
                    if (angularizedElement.data('_tooltip-parent') &&
                        angularizedElement.data('_tooltip-parent') === theTooltipElement) {

                        return angularizedElement;
                    }
                }
            }
        },
        removeAppendedTip = function removeAppendedTip(theTooltipElement) {
            var tipElement = getAppendedTip(theTooltipElement);

            if (tipElement) {

                tipElement.remove();
            }
        },
        isOutOfPage = function isOutOfPage(theTipElement) {

            if (theTipElement) {
                var squarePosition = theTipElement[0].getBoundingClientRect();

                if (squarePosition.top < 0 ||
                    squarePosition.top > window.document.body.offsetHeight ||
                    squarePosition.left < 0 ||
                    squarePosition.left > window.document.body.offsetWidth ||
                    squarePosition.bottom < 0 ||
                    squarePosition.bottom > window.document.body.offsetHeight ||
                    squarePosition.right < 0 ||
                    squarePosition.right > window.document.body.offsetWidth) {

                    theTipElement.css({
                        'top': '',
                        'left': '',
                        'bottom': '',
                        'right': ''
                    });
                    return true;
                }

                return false;
            }

            throw new Error('You must provide a position');
        },
        tooltipConfigurationProvider = function tooltipConfigurationProvider() {

            var tooltipConfiguration = {
                'side': 'top',
                'showTrigger': 'mouseover',
                'hideTrigger': 'mouseleave',
                'class': '',
                'smart': false,
                'closeButton': false,
                'size': '',
                'speed': 'steady',
                'tooltipTemplateUrlCache': false
            };

            return {
                'configure': function configure(configuration) {
                    var configurationKeys = Object.keys(tooltipConfiguration),
                        configurationIndex = 0,
                        aConfigurationKey;

                    if (configuration) {

                        for (; configurationIndex < configurationKeys.length; configurationIndex += 1) {

                            aConfigurationKey = configurationKeys[configurationIndex];
                            if (aConfigurationKey &&
                                configuration[aConfigurationKey]) {

                                tooltipConfiguration[aConfigurationKey] = configuration[aConfigurationKey];
                            }
                        }
                    }
                },
                '$get': /*@ngInject*/ function instantiateProvider() {

                    return tooltipConfiguration;
                }
            };
        },
        tooltipDirective = /*@ngInject*/ ['$log', '$http', '$compile', '$timeout', '$controller', '$injector', 'tooltipsConf', '$templateCache', function tooltipDirective($log, $http, $compile, $timeout, $controller, $injector, tooltipsConf, $templateCache) {

            var linkingFunction = function linkingFunction($scope, $element, $attrs, $controllerDirective, $transcludeFunc) {

                if ($attrs.tooltipTemplate &&
                    $attrs.tooltipTemplateUrl) {

                    throw new Error('You can not define tooltip-template and tooltip-template-url together');
                }

                if (!($attrs.tooltipTemplateUrl || $attrs.tooltipTemplate) &&
                    $attrs.tooltipController) {

                    throw new Error('You can not have a controller without a template or templateUrl defined');
                }

                var oldTooltipSide = '_' + tooltipsConf.side,
                    oldTooltipShowTrigger = tooltipsConf.showTrigger,
                    oldTooltipHideTrigger = tooltipsConf.hideTrigger,
                    oldTooltipClass, oldSize = tooltipsConf.size,
                    oldSpeed = '_' + tooltipsConf.speed;

                $attrs.tooltipSide = $attrs.tooltipSide || tooltipsConf.side;
                $attrs.tooltipShowTrigger = $attrs.tooltipShowTrigger || tooltipsConf.showTrigger;
                $attrs.tooltipHideTrigger = $attrs.tooltipHideTrigger || tooltipsConf.hideTrigger;
                $attrs.tooltipClass = $attrs.tooltipClass || tooltipsConf.class;
                $attrs.tooltipSmart = $attrs.tooltipSmart === 'true' || tooltipsConf.smart;
                $attrs.tooltipCloseButton = $attrs.tooltipCloseButton || tooltipsConf.closeButton.toString();
                $attrs.tooltipSize = $attrs.tooltipSize || tooltipsConf.size;
                $attrs.tooltipSpeed = $attrs.tooltipSpeed || tooltipsConf.speed;
                $attrs.tooltipAppendToBody = $attrs.tooltipAppendToBody === 'true';

                $transcludeFunc($scope, function onTransclusionDone(element, scope) {
                    var attributes = getAttributesToAdd(element),
                        tooltipElement = angular.element(window.document.createElement('tooltip')),
                        tipContElement = angular.element(window.document.createElement('tip-cont')),
                        tipElement = angular.element(window.document.createElement('tip')),
                        tipTipElement = angular.element(window.document.createElement('tip-tip')),
                        closeButtonElement = angular.element(window.document.createElement('span')),
                        tipArrowElement = angular.element(window.document.createElement('tip-arrow')),
                        whenActivateMultilineCalculation = function whenActivateMultilineCalculation() {

                            return tipContElement.html();
                        },
                        calculateIfMultiLine = function calculateIfMultiLine(newValue) {

                            if (newValue !== undefined &&
                                tipContElement[0].getClientRects().length > 1) {

                                tooltipElement.addClass('_multiline');
                            } else {

                                tooltipElement.removeClass('_multiline');
                            }
                        },
                        onTooltipShow = function onTooltipShow(event) {

                            tipElement.addClass('_hidden');
                            if ($attrs.tooltipSmart) {

                                switch ($attrs.tooltipSide) {
                                    case 'top':
                                        {

                                            if (isOutOfPage(tipElement)) {

                                                tooltipElement.removeClass('_top');
                                                tooltipElement.addClass('_left');
                                                if (isOutOfPage(tipElement)) {

                                                    tooltipElement.removeClass('_left');
                                                    tooltipElement.addClass('_bottom');
                                                    if (isOutOfPage(tipElement)) {

                                                        tooltipElement.removeClass('_bottom');
                                                        tooltipElement.addClass('_right');
                                                        if (isOutOfPage(tipElement)) {

                                                            tooltipElement.removeClass('_right');
                                                            tooltipElement.addClass('_top');
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        }

                                    case 'left':
                                        {

                                            if (isOutOfPage(tipElement)) {

                                                tooltipElement.removeClass('_left');
                                                tooltipElement.addClass('_bottom');
                                                if (isOutOfPage(tipElement)) {

                                                    tooltipElement.removeClass('_bottom');
                                                    tooltipElement.addClass('_right');
                                                    if (isOutOfPage(tipElement)) {

                                                        tooltipElement.removeClass('_right');
                                                        tooltipElement.addClass('_top');
                                                        if (isOutOfPage(tipElement)) {

                                                            tooltipElement.removeClass('_top');
                                                            tooltipElement.addClass('_left');
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        }

                                    case 'bottom':
                                        {

                                            if (isOutOfPage(tipElement)) {

                                                tooltipElement.removeClass('_bottom');
                                                tooltipElement.addClass('_left');
                                                if (isOutOfPage(tipElement)) {

                                                    tooltipElement.removeClass('_left');
                                                    tooltipElement.addClass('_top');
                                                    if (isOutOfPage(tipElement)) {

                                                        tooltipElement.removeClass('_top');
                                                        tooltipElement.addClass('_right');
                                                        if (isOutOfPage(tipElement)) {

                                                            tooltipElement.removeClass('_right');
                                                            tooltipElement.addClass('_bottom');
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        }

                                    case 'right':
                                        {

                                            if (isOutOfPage(tipElement)) {

                                                tooltipElement.removeClass('_right');
                                                tooltipElement.addClass('_top');
                                                if (isOutOfPage(tipElement)) {

                                                    tooltipElement.removeClass('_top');
                                                    tooltipElement.addClass('_left');
                                                    if (isOutOfPage(tipElement)) {

                                                        tooltipElement.removeClass('_left');
                                                        tooltipElement.addClass('_bottom');
                                                        if (isOutOfPage(tipElement)) {

                                                            tooltipElement.removeClass('_bottom');
                                                            tooltipElement.addClass('_right');
                                                        }
                                                    }
                                                }
                                            }
                                            break;
                                        }
                                    default:
                                        {

                                            throw new Error('Position not supported');
                                        }
                                }
                            }

                            if ($attrs.tooltipAppendToBody) {

                                var tipTipElementStyle = getStyle(tipTipElement[0]),
                                    tipArrowElementStyle = getStyle(tipArrowElement[0]),
                                    tipElementStyle = getStyle(tipElement[0]),
                                    tipElementBoundingClientRect = tipElement[0].getBoundingClientRect(),
                                    exradicatedTipElement = angular.copy(tipElement),
                                    tipTipStyleIndex = 0,
                                    tipTipStyleLength = tipTipElementStyle.length,
                                    tipArrowStyleIndex = 0,
                                    tipArrowStyleLength = tipArrowElementStyle.length,
                                    tipStyleIndex = 0,
                                    tipStyleLength = tipElementStyle.length,
                                    aStyleKey, tipTipCssToSet = {},
                                    tipCssToSet = {},
                                    tipArrowCssToSet = {},
                                    paddingTopValue, paddingBottomValue, paddingLeftValue, paddingRightValue;

                                tipElement.removeClass('_hidden');
                                exradicatedTipElement.removeClass('_hidden');
                                exradicatedTipElement.data('_tooltip-parent', tooltipElement);
                                removeAppendedTip(tooltipElement);

                                for (; tipTipStyleIndex < tipTipStyleLength; tipTipStyleIndex += 1) {

                                    aStyleKey = tipTipElementStyle[tipTipStyleIndex];
                                    if (aStyleKey &&
                                        tipTipElementStyle.getPropertyValue(aStyleKey)) {

                                        tipTipCssToSet[aStyleKey] = tipTipElementStyle.getPropertyValue(aStyleKey);
                                    }
                                }

                                for (; tipArrowStyleIndex < tipArrowStyleLength; tipArrowStyleIndex += 1) {

                                    aStyleKey = tipArrowElementStyle[tipArrowStyleIndex];
                                    if (aStyleKey &&
                                        tipArrowElementStyle.getPropertyValue(aStyleKey)) {

                                        tipArrowCssToSet[aStyleKey] = tipArrowElementStyle.getPropertyValue(aStyleKey);
                                    }
                                }

                                for (; tipStyleIndex < tipStyleLength; tipStyleIndex += 1) {

                                    aStyleKey = tipElementStyle[tipStyleIndex];
                                    if (aStyleKey &&
                                        aStyleKey !== 'position' &&
                                        aStyleKey !== 'display' &&
                                        aStyleKey !== 'opacity' &&
                                        aStyleKey !== 'z-index' &&
                                        aStyleKey !== 'bottom' &&
                                        aStyleKey !== 'height' &&
                                        aStyleKey !== 'left' &&
                                        aStyleKey !== 'right' &&
                                        aStyleKey !== 'top' &&
                                        aStyleKey !== 'width' &&
                                        tipElementStyle.getPropertyValue(aStyleKey)) {

                                        tipCssToSet[aStyleKey] = tipElementStyle.getPropertyValue(aStyleKey);
                                    }
                                }
                                paddingTopValue = window.parseInt(tipElementStyle.getPropertyValue('padding-top'), 10);
                                paddingBottomValue = window.parseInt(tipElementStyle.getPropertyValue('padding-bottom'), 10);
                                paddingLeftValue = window.parseInt(tipElementStyle.getPropertyValue('padding-left'), 10);
                                paddingRightValue = window.parseInt(tipElementStyle.getPropertyValue('padding-right'), 10);

                                tipCssToSet.top = tipElementBoundingClientRect.top + window.pageYOffset + 'px';
                                tipCssToSet.left = tipElementBoundingClientRect.left + window.pageXOffset + 'px';
                                tipCssToSet.height = tipElementBoundingClientRect.height - (paddingTopValue + paddingBottomValue) + 'px';
                                tipCssToSet.width = tipElementBoundingClientRect.width - (paddingLeftValue + paddingRightValue) + 'px';

                                exradicatedTipElement.css(tipCssToSet);

                                exradicatedTipElement.children().css(tipTipCssToSet);
                                exradicatedTipElement.children().next().css(tipArrowCssToSet);
                                if (event &&
                                    $attrs.tooltipHidden !== 'true') {

                                    exradicatedTipElement.addClass('_exradicated-tooltip');
                                    angular.element(window.document.body).append(exradicatedTipElement);
                                }
                            } else {

                                tipElement.removeClass('_hidden');
                                if (event &&
                                    $attrs.tooltipHidden !== 'true') {

                                    tooltipElement.addClass('active');
                                }
                            }
                        },
                        onTooltipHide = function onTooltipHide() {

                            if ($attrs.tooltipAppendToBody) {

                                removeAppendedTip(tooltipElement);
                            } else {

                                tooltipElement.removeClass('active');
                            }
                        },
                        registerOnScrollFrom = function registerOnScrollFrom(theElement) {
                            var parentElement = theElement.parent(),
                                timer;

                            if (theElement[0] &&
                                (theElement[0].scrollHeight > theElement[0].clientHeight ||
                                    theElement[0].scrollWidth > theElement[0].clientWidth)) {

                                theElement.on('scroll', function onScroll() {
                                    var that = this;

                                    if (timer) {

                                        $timeout.cancel(timer);
                                    }

                                    timer = $timeout(function doLater() {

                                        var theTipElement = getAppendedTip(tooltipElement),
                                            tooltipBoundingRect = tooltipElement[0].getBoundingClientRect(),
                                            thatBoundingRect = that.getBoundingClientRect();

                                        if (tooltipBoundingRect.top < thatBoundingRect.top ||
                                            tooltipBoundingRect.bottom > thatBoundingRect.bottom ||
                                            tooltipBoundingRect.left < thatBoundingRect.left ||
                                            tooltipBoundingRect.right > thatBoundingRect.right) {

                                            removeAppendedTip(tooltipElement);
                                        } else if (theTipElement) {

                                            onTooltipShow(true);
                                        }
                                    });
                                });
                            }

                            if (parentElement &&
                                parentElement.length) {

                                registerOnScrollFrom(parentElement);
                            }
                        },
                        onTooltipTemplateChange = function onTooltipTemplateChange(newValue) {
                            if (newValue) {
                                tooltipElement.removeClass('_force-hidden'); //see lines below, this forces to hide tooltip when is empty
                                tipTipElement.empty();
                                tipTipElement.append(closeButtonElement);
                                tipTipElement.append(newValue);
                                $timeout(function doLaterShow() {

                                    onTooltipShow();
                                });
                            } else {
                                //hide tooltip because is empty
                                tipTipElement.empty();
                                tooltipElement.addClass('_force-hidden'); //force to be hidden if empty
                            }
                        },
                        onTooltipTemplateUrlChange = function onTooltipTemplateUrlChange(newValue) {
                            if (newValue && !$attrs.tooltipTemplateUrlCache) {

                                $http.get(newValue).then(function onResponse(response) {

                                    if (response &&
                                        response.data) {

                                        tooltipElement.removeClass('_force-hidden'); //see lines below, this forces to hide tooltip when is empty
                                        tipTipElement.empty();
                                        tipTipElement.append(closeButtonElement);
                                        tipTipElement.append($compile(response.data)(scope));
                                        $timeout(function doLater() {

                                            onTooltipShow();
                                        });
                                    }
                                });
                            } else {
                                //hide tooltip because is empty
                                tipTipElement.empty();
                                tooltipElement.addClass('_force-hidden'); //force to be hidden if empty
                            }
                        },
                        onTooltipTemplateUrlCacheChange = function onTooltipTemplateUrlCacheChange(newValue) {
                            if (newValue && $attrs.tooltipTemplateUrl) {

                                var template = $templateCache.get($attrs.tooltipTemplateUrl);

                                if (typeof template !== 'undefined') {

                                    tooltipElement.removeClass('_force-hidden'); //see lines below, this forces to hide tooltip when is empty
                                    tipTipElement.empty();
                                    tipTipElement.append(closeButtonElement);
                                    tipTipElement.append($compile(template)(scope));
                                    $timeout(function doLater() {
                                        onTooltipShow();
                                    });
                                }
                            } else {
                                //hide tooltip because is empty
                                tipTipElement.empty();
                                tooltipElement.addClass('_force-hidden'); //force to be hidden if empty
                            }
                        },
                        onTooltipSideChange = function onTooltipSideChange(newValue) {

                            if (newValue) {

                                if (oldTooltipSide) {

                                    tooltipElement.removeAttr('_' + oldTooltipSide);
                                }
                                tooltipElement.addClass('_' + newValue);
                                oldTooltipSide = newValue;
                            }
                        },
                        onTooltipShowTrigger = function onTooltipShowTrigger(newValue) {

                            if (newValue) {

                                if (oldTooltipShowTrigger) {

                                    tooltipElement.off(oldTooltipShowTrigger);
                                }
                                tooltipElement.on(newValue, onTooltipShow);
                                oldTooltipShowTrigger = newValue;
                            }
                        },
                        onTooltipHideTrigger = function onTooltipHideTrigger(newValue) {

                            if (newValue) {

                                if (oldTooltipHideTrigger) {

                                    tooltipElement.off(oldTooltipHideTrigger);
                                }
                                tooltipElement.on(newValue, onTooltipHide);
                                oldTooltipHideTrigger = newValue;
                            }
                        },
                        onTooltipClassChange = function onTooltipClassChange(newValue) {

                            if (newValue) {

                                if (oldTooltipClass) {

                                    tipElement.removeClass(oldTooltipClass);
                                }
                                tipElement.addClass(newValue);
                                oldTooltipClass = newValue;
                            }
                        },
                        onTooltipSmartChange = function onTooltipSmartChange() {

                            if (typeof $attrs.tooltipSmart !== 'boolean') {

                                $attrs.tooltipSmart = $attrs.tooltipSmart === 'true';
                            }
                        },
                        onTooltipCloseButtonChange = function onTooltipCloseButtonChange(newValue) {
                            var enableButton = newValue === 'true';

                            if (enableButton) {

                                closeButtonElement.on('click', onTooltipHide);
                                closeButtonElement.css('display', 'block');
                            } else {

                                closeButtonElement.off('click');
                                closeButtonElement.css('display', 'none');
                            }
                        },
                        onTooltipTemplateControllerChange = function onTooltipTemplateControllerChange(newValue) {

                            if (newValue) {

                                var tipController = $controller(newValue, {
                                        '$scope': scope
                                    }),
                                    newScope = scope.$new(false, scope),
                                    indexOfAs = newValue.indexOf('as'),
                                    controllerName;

                                if (indexOfAs >= 0) {

                                    controllerName = newValue.substr(indexOfAs + 3);
                                    newScope[controllerName] = tipController;
                                } else {

                                    angular.extend(newScope, tipController);
                                }

                                tipTipElement.replaceWith($compile(tipTipElement)(newScope));
                                /*eslint-disable no-use-before-define*/
                                unregisterOnTooltipControllerChange();
                                /*eslint-enable no-use-before-define*/
                            }
                        },
                        onTooltipSizeChange = function onTooltipSizeChange(newValue) {

                            if (newValue) {

                                if (oldSize) {

                                    tipTipElement.removeClass('_' + oldSize);
                                }
                                tipTipElement.addClass('_' + newValue);
                                oldSize = newValue;
                            }
                        },
                        onTooltipSpeedChange = function onTooltipSpeedChange(newValue) {

                            if (newValue) {

                                if (oldSpeed) {

                                    tooltipElement.removeClass('_' + oldSpeed);
                                }
                                tooltipElement.addClass('_' + newValue);
                                oldSpeed = newValue;
                            }
                        },
                        unregisterOnTooltipTemplateChange = $attrs.$observe('tooltipTemplate', onTooltipTemplateChange),
                        unregisterOnTooltipTemplateUrlChange = $attrs.$observe('tooltipTemplateUrl', onTooltipTemplateUrlChange),
                        unregisterOnTooltipTemplateUrlCacheChange = $attrs.$observe('tooltipTemplateUrlCache', onTooltipTemplateUrlCacheChange),
                        unregisterOnTooltipSideChangeObserver = $attrs.$observe('tooltipSide', onTooltipSideChange),
                        unregisterOnTooltipShowTrigger = $attrs.$observe('tooltipShowTrigger', onTooltipShowTrigger),
                        unregisterOnTooltipHideTrigger = $attrs.$observe('tooltipHideTrigger', onTooltipHideTrigger),
                        unregisterOnTooltipClassChange = $attrs.$observe('tooltipClass', onTooltipClassChange),
                        unregisterOnTooltipSmartChange = $attrs.$observe('tooltipSmart', onTooltipSmartChange),
                        unregisterOnTooltipCloseButtonChange = $attrs.$observe('tooltipCloseButton', onTooltipCloseButtonChange),
                        unregisterOnTooltipControllerChange = $attrs.$observe('tooltipController', onTooltipTemplateControllerChange),
                        unregisterOnTooltipSizeChange = $attrs.$observe('tooltipSize', onTooltipSizeChange),
                        unregisterOnTooltipSpeedChange = $attrs.$observe('tooltipSpeed', onTooltipSpeedChange),
                        unregisterTipContentChangeWatcher = scope.$watch(whenActivateMultilineCalculation, calculateIfMultiLine);

                    closeButtonElement.attr({
                        'id': 'close-button'
                    });
                    closeButtonElement.html('&times;');

                    tipElement.addClass('_hidden');

                    tipTipElement.append(closeButtonElement);
                    tipTipElement.append($attrs.tooltipTemplate);

                    tipElement.append(tipTipElement);
                    tipElement.append(tipArrowElement);

                    tipContElement.append(element);

                    tooltipElement.attr(attributes);
                    tooltipElement.addClass('tooltips');

                    tooltipElement.append(tipContElement);
                    tooltipElement.append(tipElement);
                    $element.after(tooltipElement);

                    if ($attrs.tooltipAppendToBody) {

                        resizeObserver.add(function onResize() {

                            registerOnScrollFrom(tooltipElement);
                        });
                        registerOnScrollFrom(tooltipElement);
                    }

                    resizeObserver.add(function registerResize() {

                        calculateIfMultiLine();
                        onTooltipShow();
                    });

                    $timeout(function doLater() {

                        onTooltipShow();
                        tipElement.removeClass('_hidden');
                        tooltipElement.addClass('_ready');
                    });

                    scope.$on('$destroy', function unregisterListeners() {

                        unregisterOnTooltipTemplateChange();
                        unregisterOnTooltipTemplateUrlChange();
                        unregisterOnTooltipTemplateUrlCacheChange();
                        unregisterOnTooltipSideChangeObserver();
                        unregisterOnTooltipShowTrigger();
                        unregisterOnTooltipHideTrigger();
                        unregisterOnTooltipClassChange();
                        unregisterOnTooltipSmartChange();
                        unregisterOnTooltipCloseButtonChange();
                        unregisterOnTooltipSizeChange();
                        unregisterOnTooltipSpeedChange();
                        unregisterTipContentChangeWatcher();
                        resizeObserver.remove();
                        element.off($attrs.tooltipShowTrigger + ' ' + $attrs.tooltipHideTrigger);
                    });
                });
            };

            return {
                'restrict': 'A',
                'transclude': 'element',
                'priority': 1,
                'terminal': true,
                'link': linkingFunction
            };
        }];

    angular.module('720kb.tooltips', [])
        .provider(directiveName + 'Conf', tooltipConfigurationProvider)
        .directive(directiveName, tooltipDirective);
}(angular, window));

angular.module("lucidGrowl", ['appConfig'])
    .directive('lucidGrowl', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                color: '@',
                hideGrowl: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'growl/lucid-growl.html',
        };
    }]); 

angular.module('dynamicHeightHide', [])
    .animation('.dynamic-height-hide', ['$animateCss', function($animateCss) {
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
                            height: height + 'px'
                        },
                        to: {
                            height: '0px'
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

