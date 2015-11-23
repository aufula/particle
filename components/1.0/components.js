/*global angular : true fixes codekit error*/

//libraries
//@codekit-prepend "../../lib/angular/angular.min.js"
//@codekit-prepend "../../lib/angular/angular-animate.min.js"

//@codekit-prepend "../../lib/Sortable.min.js"
//@codekit-prepend "../../lib/ng-sortable.js"

//@codekit-append "../../lib/svg-morpheus.js"
//@codekit-append "../../lib/ngDraggable.js"
//@codekit-append "../../lib/angular-drag-and-drop-lists.min.js"

//include components js
//@codekit-append "input-stepper/lucid-input-stepper.js"
//@codekit-append "color-picker/lucid-color-picker.js"
//@codekit-append "popover-menu/lucid-popover-menu.js"
//@codekit-append "more-drawer/lucid-more-drawer.js"
//@codekit-append "modal/lucid-modal.js"
//@codekit-append "finger-tabs/lucid-finger-tabs.js"
//@codekit-append "buttcon-popover/lucid-buttcon-popover.js"
//@codekit-append "collapse-bar/lucid-collapse-bar.js"
//@codekit-append "buttcon-toggle/lucid-buttcon-toggle.js"
//@codekit-append "notification/lucid-notification.js"
//@codekit-append "select/lucid-select.js"
//@codekit-append "button/lucid-button.js"
//@codekit-append "context-menu/lucid-context-menu.js"

//include Data JS
//@codekit-append "themes/lucid-themes-data.js"
//@codekit-append "shapes-manager/lucid-shapes-data.js"
//@codekit-append "pages/lucid-pages-data.js"




angular.module('appConfig', [])

// .config(['$animateProvider', function($animateProvider){
//   // restrict animation to elements with the lucid-animate css class with a regexp.
//   // this should improve animation performance
//   $animateProvider.classNameFilter(/lucid-animate/);
// }])

.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://particle.golucid.co/components/**',
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/**'
    ]);
})

.constant("config", {
    //'componentsURL': "/components/1.0/" //local dev
    'componentsURL': "http://particle.golucid.co/components/1.0/" //github

});

angular.module("lucidComponents", ['ngAnimate', 'ngDraggable', 'ngSortable', 'dndLists', 'lucidThemesData', 'lucidPagesData', 'lucidShapesData', 'lucidInputStepper', 'lucidPopoverMenu', 'lucidButtconPopover', 'lucidColorPicker', 'lucidMoreDrawer', 'lucidModal', 'lucidFingerTabs', 'lucidButtconPopover', 'lucidButtconToggle', 'lucidNotification', 'lucidSelect', 'lucidButton', 'lucidCollapseBar', 'lucidContextMenu'])


////////////////////      REUSABLE DIRECTIVES      //////////////////////
//hit enter key
.directive('ngEnter', function() {
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
})

//hit escape key
.directive('escKey', function() {
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
})

//right click
.directive('ngRightClick', function($parse) {
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
})


//click outside element
.directive('clickOutside', function($document) {

    return {
        restrict: 'A',
        scope: {
            clickOutside: '&'
        },
        link: function(scope, el, attr) {

            $document.on('click', function(e) {
                if (el !== e.target && !el[0].contains(e.target)) {
                    scope.$apply(function() {
                        scope.$eval(scope.clickOutside);
                    });
                }
            });
        }
    }

})

//this improves performance on ng-repeats that don't need a watch.
.directive('ngOnce', function($timeout) {
    return {
        restrict: 'EA',
        priority: 500,
        transclude: true,
        template: '<div ng-transclude></div>',
        compile: function(tElement, tAttrs, transclude) {
            //console.log([tElement, tAttrs, transclude])
            return function postLink(scope, iElement, iAttrs, controller) {
                $timeout(scope.$destroy.bind(scope), 0);
                //scope.$destroy()
                //console.log([scope, iElement, iAttrs, controller]);
            }
        }
    };
})

//this is for the select on load when you create a new shape library
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

////////////////////      Filters      //////////////////////

//filter used to send svgs as html
.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
}])



///////////////////      Animations      //////////////////////


//this is used with shape libraries
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