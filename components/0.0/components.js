/*global angular : true fixes codekit error*/

//@codekit-append "canvas/lucid-canvas-data.js"
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
//@codekit-append "canvas/lucid-canvas.js"
//@codekit-append "chart-block/lucid-chart-block.js"
//@codekit-append "saved-styles/lucid-saved-styles.js"
//@codekit-append "themes/lucid-themes.js"
//@codekit-append "shapes-library/lucid-shapes-library.js"
//@codekit-append "shapes-manager/lucid-shapes-manager.js"
//@codekit-append "slides/lucid-slides.js"

angular.module('appConfig', [])

.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://lucidsoftware.github.io/particle/components/**'
    ]);
})

.constant("config", {
    //'componentsURL': "/components/0.0/" //local dev
    'componentsURL': "http://lucidsoftware.github.io/particle/components/0.0/" //github

});

angular.module("lucidComponents", ['ngAnimate', 'ngDraggable', 'dndLists', 'lucidCanvasData', 'lucidTextAlignment', 'lucidInputStepper', 'lucidPopoverMenu', 'lucidColorPicker', 'lucidPathStyle', 'lucidMoreDrawer', 'lucidBorderOptions', 'lucidTextOptions', 'lucidLineOptions', 'lucidPositionOptions', 'lucidShadowOptions', 'lucidShape', 'lucidShapesLibrary', 'lucidModal', 'lucidFingerTabs', 'lucidButtconPopover', 'lucidNotification', 'lucidSelect', 'lucidButton', 'lucidChartBlock', 'lucidCanvas', 'lucidShapesManager', 'lucidSavedStyles', 'lucidThemes', 'lucidSlides'])

.directive('ngdEnter', function() {
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
}]);