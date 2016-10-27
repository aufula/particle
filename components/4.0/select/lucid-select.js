angular.module("lucidSelect", ['appConfig'])
    .directive('lucidSelect', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                selectedOption: '=?ngModel',
                options: '=?',
                width: '@',
                label: '@'
            },
            transclude: true,
            templateUrl: config.componentsURL + 'select/lucid-select.html',

            controller: ['$scope', function($scope) {
                if (!$scope.selectedOption) {
                    //if ng-model isn't set, set selectedOption to first value in array
                    $scope.selectedOption = $scope.options[0];
                }
            }]
        };
    }]);