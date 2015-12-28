angular.module("lucidSelect", ['appConfig'])
    .directive('lucidSelect', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                selectedOption: '=ngModel',
                options: '=',
                width: '@',
                label: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'select/lucid-select.html',

            controller: function($scope) {
                if (!$scope.selectedOption) {
                    //if ng-model isn't set, set selectedOption to first value in array
                    $scope.selectedOption = $scope.options[0];
                }
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