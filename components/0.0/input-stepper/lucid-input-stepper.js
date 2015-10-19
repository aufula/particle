angular.module('lucidInputStepper', ['appConfig'])
    .directive('lucidInputStepper', function(config) {
        return {
            restrict: 'AE',
            scope: {
                unit: '@',
                step: '@',
                number: '=',
                width: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'input-stepper/lucid-input-stepper.html',
            controller: function($scope) {
                $scope.stepUp = function() {
                    $scope.number = parseInt($scope.number) + parseInt($scope.step);
                };
                $scope.stepDown = function() {
                    $scope.number = parseInt($scope.number) + parseInt(-$scope.step);
                };
            }
        };
    });