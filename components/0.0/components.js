/*global angular : true fixes codekit error*/

//libraries
//@codekit-prepend "../../lib/angular/angular.min.js"
//@codekit-prepend "../../lib/angular/angular-animate.min.js"

//@codekit-prepend "../../lib/Sortable.min.js"
//@codekit-prepend "../../lib/ng-sortable.js"

//@codekit-append "../../lib/svg-morpheus.js"
//@codekit-append "../../lib/ngDraggable.js"
//@codekit-append "../../lib/angular-drag-and-drop-lists.min.js"

//components
//@codekit-append "themes/lucid-themes-data.js"
//@codekit-append "input-stepper/lucid-input-stepper.js"
//@codekit-append "color-picker/lucid-color-picker.js"
//@codekit-append "popover-menu/lucid-popover-menu.js"
//@codekit-append "path-style/lucid-path-style.js"
//@codekit-append "text-alignment/lucid-text-alignment.js"
//@codekit-append "more-drawer/lucid-more-drawer.js"
//@codekit-append "border-options/lucid-border-options.js"
//@codekit-append "text-options/lucid-text-options.js"
//@codekit-append "line-options/lucid-line-options.js"
//@codekit-append "position-options/lucid-position-options.js"
//@codekit-append "shadow-options/lucid-shadow-options.js"
//@codekit-append "modal/lucid-modal.js"
//@codekit-append "shape/lucid-shape.js"
//@codekit-append "finger-tabs/lucid-finger-tabs.js"
//@codekit-append "buttcon-popover/lucid-buttcon-popover.js"
//@codekit-append "notification/lucid-notification.js"
//@codekit-append "select/lucid-select.js"
//@codekit-append "button/lucid-button.js"
//@codekit-append "chart-block/lucid-chart-block.js"
//@codekit-append "saved-styles/lucid-saved-styles.js"
//@codekit-append "themes/lucid-themes.js"
//@codekit-append "shape-group/lucid-shape-group.js"
//@codekit-append "shapes-manager/lucid-shapes-manager.js"
//@codekit-append "shapes-manager/lucid-shapes-data.js"
//@codekit-append "slides/lucid-slides.js"
//@codekit-append "context-menu/lucid-context-menu.js"
//@codekit-append "settings-drawer/lucid-settings-drawer.js"
//@codekit-append "page/lucid-page.js"
//@codekit-append "pages/lucid-pages.js"
//@codekit-append "pages/lucid-pages-data.js"
//@codekit-append "canvas/lucid-canvas.js"


angular.module('appConfig', [])

.config(['$animateProvider', function($animateProvider){
  // restrict animation to elements with the lucid-animate css class with a regexp.
  // this should improve animation performance
  $animateProvider.classNameFilter(/lucid-animate/);
}])

.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://lucidsoftware.github.io/particle/components/**'
    ]);
})

.constant("config", {
    //'componentsURL': "/components/0.0/" //local dev
    'componentsURL': "https://lucidsoftware.github.io/particle/components/0.0/" //github

});

angular.module("lucidComponents", ['ngAnimate', 'ngDraggable', 'lucidThemesData', 'lucidTextAlignment', 'lucidInputStepper', 'lucidPopoverMenu', 'lucidColorPicker', 'lucidPathStyle', 'lucidMoreDrawer', 'lucidBorderOptions', 'lucidTextOptions', 'lucidLineOptions', 'lucidPositionOptions', 'lucidShadowOptions', 'lucidShape', 'lucidShapeGroup', 'lucidModal', 'lucidFingerTabs', 'lucidButtconPopover', 'lucidNotification', 'lucidSelect', 'lucidButton', 'lucidChartBlock', 'lucidCanvas', 'lucidShapesManager', 'lucidSavedStyles', 'lucidThemes', 'lucidSlides', 'lucidContextMenu', 'dndLists', 'lucidSettingsDrawer', 'lucidPage', 'lucidPages', 'lucidPagesData', 'ngSortable'])


////////////////////      REUSABLE DIRECTIVES      //////////////////////
//on enter
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

//escape
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

//outside
///options click-outside="closeThis()" outside-if-not="my-button, other-button" my-button is an id of another element.
.directive('clickOutside', function ($document, $parse) {
        return {
            restrict: 'A',
            link: function($scope, elem, attr) {
                var classList = (attr.outsideIfNot !== undefined) ? attr.outsideIfNot.replace(', ', ',').split(',') : [],
                    fn = $parse(attr.clickOutside);

                // add the elements id so it is not counted in the click listening
                if (attr.id !== undefined) {
                    classList.push(attr.id);
                }

                var eventHandler = function(e) {

                    //check if our element already hiden
                    if(angular.element(elem).hasClass("ng-hide")){
                        return;
                    }

                    var i = 0,
                        element;

                    // if there is no click target, no point going on
                    if (!e || !e.target) {
                        return;
                    }

                    // loop through the available elements, looking for classes in the class list that might match and so will eat
                    for (element = e.target; element; element = element.parentNode) {
                        var id = element.id,
                            classNames = element.className,
                            l = classList.length;

                        // loop through the elements id's and classnames looking for exceptions
                        for (i = 0; i < l; i++) {
                            // check for id's or classes, but only if they exist in the first place
                            if ((id !== undefined && id.indexOf(classList[i]) > -1) || (classNames && classNames.indexOf(classList[i]) > -1)) {
                                // now let's exit out as it is an element that has been defined as being ignored for clicking outside
                                return;
                            }
                        }
                    }

                    // if we have got this far, then we are good to go with processing the command passed in via the click-outside attribute
                    return $scope.$apply(function () {
                        return fn($scope);
                    });
                };

                // assign the document click handler to a variable so we can un-register it when the directive is destroyed
                $document.on('click', eventHandler);

                // when the scope is destroyed, clean up the documents click handler as we don't want it hanging around
                $scope.$on('$destroy', function() {
                    $document.off('click', eventHandler);
                });
            }
        };
    })


////////////////////      Filters      //////////////////////

///filter unique objects
.filter('unique', function() {

    return function(items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            //var hashCheck = {}, 
            var newItems = [];

            var extractValueToCompare = function(item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function(item) {
                //var valueToCheck, 
                var isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
})

//filter used to send svgs as html
.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
}])

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
    });