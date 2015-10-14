angular.module("lucidSelect", [])
    .directive('lucidSelect', function($document) {
        return {
            restrict: 'E',
            scope: {
                options: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: "components/0.0/select/lucid-select.html",

            controller: function($scope) {
                $scope.selectedOption = $scope.options[0];
            },

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showdropdown = false;
                        scope.$apply();
                    }
                });
            }
        };
    });