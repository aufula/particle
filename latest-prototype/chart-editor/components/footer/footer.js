angular.module('footer', ['appConfig'])
    .directive('editInPlaceDbl', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                editableText: '=ngModel',
                placeholder: '@',
                edit: '='
            },
            replace: true,
            templateUrl: 'components/footer/edit-in-place-dbl.html',
            controller: ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {
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
            }]
        };
    }]);