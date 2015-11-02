angular.module("lucidPage", ['appConfig'])
    .directive('lucidPage', function(config, $document, shapesData) {
        return {
            restrict: 'E',
            scope: {
                thumbnail: "@",
                master: "@",
                masterapplied: "@",
                name: "@",
                id: "@",
                selected: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'page/lucid-page.html',
            controller: function($scope) {
                if(!$scope.selected){
                    $scope.selected = 1;
                }
            }
        };
    });