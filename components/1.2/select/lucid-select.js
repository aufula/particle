angular.module("lucidSelect", ['appConfig'])
    .directive('lucidSelect', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                width: '@',
                label: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'select/lucid-select.html',

            controller: function($scope) {
                $scope.selectedOption = $scope.options[0];
            },

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showdropdown = false;
                        scope.$apply();
                    }
                });
            }
        };
    });