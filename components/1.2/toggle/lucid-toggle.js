angular.module('lucidToggle', ['appConfig'])
    .directive('lucidToggle', function(config) {
        return {
            restrict: 'E',
            scope: {
                toggle: '=',
                activetext: '@',
                inactivetext: '@',
                label: '@',
                width: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'toggle/lucid-toggle.html',
            controller: function($scope){
                $scope.componentsURL = config.componentsURL;
            },
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
    });