angular.module('lucidInputStepper', ['appConfig'])
    .directive('lucidInputStepper', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                unit: '@',
                step: '@',
                number: '=?ngModel',
                width: '@',
                label: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'input-stepper/lucid-input-stepper.html',
            controller: ['$scope', '$interval', function($scope, $interval) {
                var $promise = null;
                $scope.$watch('number + unit', function() {
                    if ($scope.unit !== '%') {
                        $scope.stepperinput = $scope.number + ' ' + $scope.unit;
                    }
                    else{
                        $scope.stepperinput = $scope.number + $scope.unit;
                    }
                });

                $scope.removeText = function() {
                    var text = $scope.stepperinput;
                    //removing text keeping decimal
                    $scope.number = text.replace(/[^0-9.]/g, "");
                };

                $scope.updateInput = function() {
                    $scope.removeText();
                    $scope.number = Number($scope.number);
                };
                $scope.stepUp = function() {
                    //first step up instantly on click

                    $scope.removeText();
                    $scope.number = Number($scope.number) + Number($scope.step);
                    //then continually step up if still holding.
                    $promise = $interval(function() {
                        $scope.removeText();
                        $scope.number = Number($scope.number) + Number($scope.step);


                    }, 100);

                };
                $scope.stepDown = function() {

                    //first step down instantly on click
                    $scope.removeText();
                    if ($scope.number < 1) {
                        //console.log('zero');
                        return;
                    }
                    $scope.number = Number($scope.number) + Number(-$scope.step);
                    //then continually step down if still holding.
                    $promise = $interval(function() {

                        $scope.removeText();
                        if ($scope.number < 1) {
                            //console.log('zero');
                            return;
                        }
                        $scope.number = Number($scope.number) + Number(-$scope.step);

                    }, 100);
                };
                $scope.mouseUp = function() {
                    if ($promise) {
                        $interval.cancel($promise);
                    }
                };
            }],
            compile: function(el, attrs) {
                if (!attrs.step) {
                    attrs.step = 1;
                }
                if (!attrs.unit) {
                    attrs.unit = "";
                }
                if (!attrs.number) {
                    attrs.number = "0";
                }
            }
        };
    }]);