angular.module("lucidPages", ['appConfig', 'lucidPage'])
    .directive('lucidPages', function(config) {
        return {
            restrict: 'E',
            scope: {
                pages: "="
            },
            replace: true,
            templateUrl: config.componentsURL + 'pages/lucid-pages.html',
            controller: function($scope) {
                $scope.sortConfig = {
                    group: 'foobar',
                    animation: 150,
                    // onSort: function( /** ngSortEvent */ evt) {
                    //     // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
                    // }
                };
                $scope.addPage = function(){
                	var length = $scope.pages.length;
                	var uniqueID = new Date();
                	var newPage = {
                		name: 'New Page ' +(+length + 1),
                		id: uniqueID,
                	};
                	$scope.pages.splice(length,0,newPage);
                	$scope.selectedPage = uniqueID;
                };
            }
        };
    });