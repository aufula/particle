angular.module("lucidButtonDropdown", ['appConfig'])
    .directive('lucidButtonDropdown', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                text: '@',
                color: '@',
                side: '@'
            },
            transclude: true,
            templateUrl: config.componentsURL + 'button-dropdown/lucid-button-dropdown.html',
        };
    }]);