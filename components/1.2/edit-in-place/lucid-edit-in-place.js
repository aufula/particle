angular.module('editInPlace', ['appConfig'])
    .directive('editInPlace', function(config) {
        return {
            restrict: 'AE',
            scope: {
                editableText: '=ngModel',
                placeholder: '@',
                edit: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'edit-in-place/lucid-edit-in-place.html',
            controller: function($scope, $element, $timeout) {
                $scope.$watch('edit', function() {
                    $scope.selectInput();
                });
                $scope.selectInput = function() {
                    var input = $element[0].getElementsByTagName('input')[0];
                    $timeout(function() {
                        input.select();
                    }, 10);
                    //console.log('Focus This', input, 'model', $scope.editableText);

                };
            }
        };
    });