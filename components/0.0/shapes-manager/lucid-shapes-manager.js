angular.module("lucidShapesManager", ['appConfig'])
    .directive('lucidShapesManager', function(config, shapesData) {
        return {
            restrict: 'E',
            scope: {
                selected: '=',
                manageshapes: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'shapes-manager/lucid-shapes-manager.html',
            controller: function($scope) {
                $scope.shapegroups = shapesData;
                $scope.pinShapeGroup = function(item) {
                    $scope.$broadcast('content.changed', 1000);
                    item.pinned = true;
                    return item;
                };
                $scope.unPinShapeGroup = function(item) {
                    $scope.$broadcast('content.changed', 1000);
                    item.pinned = false;
                    return item;
                };
                $scope.$evalAsync(function() {
                    $scope.$broadcast('content.changed', 1000);
                });
            }
        };
    });