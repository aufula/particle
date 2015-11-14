angular.module("lucidButtconToggle", ['appConfig'])
    .directive('lucidButtconToggle', function(config) {
        return {
            restrict: 'E',
            scope: {
                icon: '@',
                label: '@',
                alignment: '@',
                active: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'buttcon-toggle/lucid-buttcon-toggle.html',
        };
    });