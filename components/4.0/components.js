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

//directives
//@codekit-append "right-click/lucid-right-click.js"
//@codekit-append "click-outside/lucid-click-outside.js"


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
    // 'componentsURL': "/components/4.0/" //local dev
    'componentsURL': "http://particle.golucid.co/components/4.0/" //github

});

angular.module("lucidComponents", ['ngAnimate', 'appConfig', 'lucidInputStepper', 'lucidButtconPopover', 'lucidColorPicker', 'lucidMoreDrawer', 'lucidModal', 'lucidFingerTabs', 'lucidButtcon', 'lucidNotification', 'lucidSelect', 'lucidInput', 'lucidButton', 'lucidCollapseBar', 'lucidContextMenu', 'lucidToggle', 'editInPlace', 'lucidTopTabs', 'lucidTip', 'lucidPaywall', 'lucidProgressStepper', 'lucidButtonDropdown', 'lucidSearch', 'lucidSlider', 'lucidGrowl', 'dynamicHeightHide', 'lucidTooltip', 'clickOutside', 'ngRightClick'])

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