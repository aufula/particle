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

                $scope.stepperinput = $scope.number + $scope.unit;
                $scope.removeText = function(){
                    var text = $scope.stepperinput;
                    var regex = /(\d+)/g;
                    $scope.number = text.match(regex);
                }
                $scope.updateInput = function(){
                    $scope.removeText();
                    $scope.stepperinput = $scope.number + $scope.unit;
                };
                $scope.stepUp = function() {
                    $scope.removeText();
                    $scope.number = parseInt($scope.number) + parseInt($scope.step);
                    $scope.stepperinput = $scope.number + $scope.unit;
                };
                $scope.stepDown = function() {
                    $scope.removeText();
                    $scope.number = parseInt($scope.number) + parseInt(-$scope.step);
                    $scope.stepperinput = $scope.number + $scope.unit;
                };
            }
        };
    });