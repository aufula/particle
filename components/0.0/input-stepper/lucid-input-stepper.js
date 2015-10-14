angular.module('lucidInputStepper', [])
    .directive('lucidInputStepper', function() {
        return {
            restrict: 'AE',
            scope: {
                append: '=',
                step: '=',
                ngModel: '=',
                width: '='
            },
            replace: true,
            templateUrl: 'components/0.0/input-stepper/lucid-input-stepper.html',
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