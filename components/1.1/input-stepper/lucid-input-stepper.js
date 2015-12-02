angular.module('lucidInputStepper', ['appConfig'])
    .directive('lucidInputStepper', function(config) {
        return {
            restrict: 'AE',
            scope: {
                unit: '@',
                step: '@',
                number: '=',
                width: '@',
                label: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'input-stepper/lucid-input-stepper.html',
            controller: function($scope, $interval) {
                $promise = null;

                $scope.$watch('number + unit', function(newValue) {
                    $scope.stepperinput = newValue;
                });

                $scope.removeText = function() {
                    var text = $scope.stepperinput;
                    var regex = /(\d+)/g;
                    $scope.number = text.match(regex);
                };

                $scope.updateInput = function() {
                    $scope.removeText();
                    $scope.number = parseInt($scope.number);
                    $scope.stepperinput = $scope.number + $scope.unit;
                };
                $scope.stepUp = function() {
                    //first step up instantly on click

                    $scope.removeText();
                    $scope.number = parseInt($scope.number) + parseInt($scope.step);
                    $scope.stepperinput = $scope.number + $scope.unit;
                    //then continually step up if still holding.
                    $promise = $interval(function() {
                        $scope.removeText();
                        $scope.number = parseInt($scope.number) + parseInt($scope.step);
                        $scope.stepperinput = $scope.number + $scope.unit;

                    }, 100);

                };
                $scope.stepDown = function() {

                    //first step down instantly on click
                    $scope.removeText();
                    if ($scope.number == 0) {
                        //console.log('zero');
                        return;
                    }
                    $scope.number = parseInt($scope.number) + parseInt(-$scope.step);
                    $scope.stepperinput = $scope.number + $scope.unit;
                    //then continually step down if still holding.
                    $promise = $interval(function() {

                        $scope.removeText();
                        if ($scope.number == 0) {
                            //console.log('zero');
                            return;
                        }
                        $scope.number = parseInt($scope.number) + parseInt(-$scope.step);
                        $scope.stepperinput = $scope.number + $scope.unit;

                    }, 100);
                };
                $scope.mouseUp = function() {
                    if ($promise) {
                        $interval.cancel($promise);
                    }
                };
            },
            compile: function(el, attrs) {
                if (!attrs.step) {
                    attrs.step = 1;
                }
            }
        };
    });