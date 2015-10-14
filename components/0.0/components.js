/*global angular : true fixes codekit error*/

//@codekit-prepend "canvas/lucid-canvas-data.js"
//@codekit-prepend "input-stepper/lucid-input-stepper.js"
//@codekit-prepend "color-picker/lucid-color-picker.js"
//@codekit-prepend "popover-menu/lucid-popover-menu.js"
//@codekit-prepend "path-style/lucid-path-style.js"
//@codekit-prepend "text-align/lucid-text-align.js"
//@codekit-prepend "more-drawer/lucid-more-drawer.js"
//@codekit-prepend "border-options/lucid-border-options.js"
//@codekit-prepend "text-options/lucid-text-options.js"
//@codekit-prepend "line-options/lucid-line-options.js"
//@codekit-prepend "position-options/lucid-position-options.js"
//@codekit-prepend "shadow-options/lucid-shadow-options.js"
//@codekit-prepend "modal/lucid-modal.js"
//@codekit-prepend "shape/lucid-shape.js"
//@codekit-prepend "finger-tabs/lucid-finger-tabs.js"
//@codekit-prepend "buttcon-popover/lucid-buttcon-popover.js"
//@codekit-prepend "notification/lucid-notification.js"
//@codekit-prepend "select/lucid-select.js"
//@codekit-prepend "button/lucid-button.js"


//@codekit-prepend "shape-library/lucid-shape-library.js"

angular.module("lucidComponents", ['ngAnimate', 'lucidCanvasData', 'lucidTextAlign', 'lucidInputStepper', 'lucidPopoverMenu','lucidColorPicker','lucidPathStyle', 'lucidMoreDrawer', 'lucidBorderOptions', 'lucidTextOptions', 'lucidLineOptions', 'lucidPositionOptions', 'lucidShadowOptions', 'lucidShape', 'lucidShapeLibrary', 'lucidModal', 'lucidFingerTabs', 'lucidButtconPopover','lucidNotification', 'lucidSelect', 'lucidButton'])
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