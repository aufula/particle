angular.module("lucidPage", ['appConfig'])
    .directive('lucidPage', function(config) {
        return {
            restrict: 'E',
            scope: {
                page: '=',
                selected: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'page/lucid-page.html',
            controller: function($scope) {
                if(!$scope.selected){
                    $scope.selected = 1;
                }
                $scope.renameData = {};
                $scope.renamePage = function(rename){
                    $scope.page.name = rename;
                    //console.log(rename);
                };
            }
        };
    });