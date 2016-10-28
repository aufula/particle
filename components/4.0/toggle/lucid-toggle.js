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