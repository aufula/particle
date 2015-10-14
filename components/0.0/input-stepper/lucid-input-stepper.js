angular.module('lucidInputStepper', ['appConfig'])
    .directive('lucidInputStepper', function(config) {
        return {
            restrict: 'AE',
            scope: {
                append: '=',
                step: '=',
                ngModel: '=',
                width: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'input-stepper/lucid-input-stepper.html',
            controller: function($scope) {
                $scope.stepUp = function() {
                    $scope.ngModel = parseInt($scope.ngModel) + parseInt($scope.step);
                };
                $scope.stepDown = function() {
                    $scope.ngModel = parseInt($scope.ngModel) + parseInt(-$scope.step);
                };
            }
        };
    });