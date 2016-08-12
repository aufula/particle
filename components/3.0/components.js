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
    //'componentsURL': "/components/3.0/" //local dev
    'componentsURL': "http://particle.golucid.co/components/3.0/" //github

});

angular.module("lucidComponents", ['ngAnimate', 'appConfig', 'lucidInputStepper', 'lucidButtconPopover', 'lucidColorPicker', 'lucidMoreDrawer', 'lucidModal', 'lucidFingerTabs', 'lucidButtcon', 'lucidNotification', 'lucidSelect', 'lucidInput', 'lucidButton', 'lucidCollapseBar', 'lucidContextMenu', 'lucidToggle', 'editInPlace','lucidTopTabs', 'lucidTip', 'lucidPaywall'])

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