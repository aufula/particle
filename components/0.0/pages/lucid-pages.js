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
                	var uniqueID = new Date().getTime();
                	var newPage = {
                		name: 'New Page ' +(+length + 1),
                		id: uniqueID,
                	};
                	$scope.pages.splice(length,0,newPage);
                	$scope.selectedPage = uniqueID;
                };
                $scope.duplicatePage = function(page, index){
                    var newpage = JSON.parse(JSON.stringify(page))
                    var newindex = +index +1
                    var uniqueID = new Date().getTime();

                    newpage.id = uniqueID;
                    newpage.name = page.name + ' Copy';
                     $scope.pages.splice(newindex,0,newpage);
                    // $scope.selectedPage = uniqueID;
                    //console.log(newpage, index);
                };
            }
        };
    });