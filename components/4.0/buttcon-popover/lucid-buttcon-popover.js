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