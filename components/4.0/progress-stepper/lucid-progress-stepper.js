angular.module("lucidProgressStepper", ['appConfig'])
    .directive('lucidProgressStepper', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'progress-stepper/lucid-progress-stepper.html',
            scope: {
                selectedStep: '=?'
            },
            transclude: true,
            controller: ['$scope', function($scope) {
                $scope.steps = [];

                this.addStep = function(step) {
                    $scope.steps.push(step);
                };

                $scope.$watch('selectedStep', function(newVal) {
                    //console.log('selected', newVal);
                    for (var i = 0; i < $scope.steps.length; i++) {
                        if (i !== newVal) {
                            $scope.steps[i].selected = false;
                        } else {
                            $scope.steps[i].selected = true;
                            //console.log('selected', i);
                        }
                    }
                });
            }]
        };
    }])
    .directive('lucidProgressStep', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'progress-stepper/lucid-progress-stepper-step.html',
            transclude: true,
            replace: true,
            scope: {
                name: '@name',
            },
            require: '^lucidProgressStepper',
            link: function(scope, element, attrs, ctrl) {
                scope.selected = attrs.selected === "" || attrs.selected === true;
                ctrl.addStep(scope);
            }
        };
    }]);