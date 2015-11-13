angular.module("lucidPages", ['appConfig', 'lucidPage', 'lucidPagesData'])
    .directive('lucidPages', function(config, $timeout, pagesData) {
        return {
            restrict: 'E',
            scope: {
                showpages: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'pages/lucid-pages.html',
            controller: function($scope, $rootScope) {
                $rootScope.pages = pagesData;
                $rootScope.currentPage = pagesData[0];

                $scope.sortConfig = {
                    group: 'foobar',
                    animation: 150,
                    // onSort: function( /** ngSortEvent */ evt) {
                    //     // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
                    // }
                };
                $scope.addPage = function() {
                    var length = $rootScope.pages.length;
                    var uniqueID = new Date().getTime();
                    var newPage = {
                        name: 'New Page ' + (+length + 1),
                        id: uniqueID,
                    };
                    $rootScope.pages.splice(length, 0, newPage);
                    $timeout(function() {
                        $rootScope.currentPage = newPage;
                    }, 10); //delay so it selects after transition
                };
                $scope.duplicatePage = function(page, index) {
                    var newPage = JSON.parse(JSON.stringify(page))
                    var newindex = +index + 1
                    var uniqueID = new Date().getTime();

                    newPage.id = uniqueID;
                    newPage.name = page.name + ' Copy';
                    $rootScope.pages.splice(newindex, 0, newPage);
                    $timeout(function() {
                        $rootScope.currentPage = newPage;
                    }, 10);
                    // $scope.selectedPage = uniqueID;
                    //console.log(newpage, index);
                };
                $rootScope.masterPageCount = function() {
                    var masterPageCount = [];
                    angular.forEach($rootScope.pages, function(page) {
                        if (page.master) {
                            masterPageCount.push(page);
                        }
                        //console.log(masterPageCount);

                    });
                    return masterPageCount;
                };
                $scope.deletePage = function(page, index) {
                    $rootScope.pages.splice(index, 1);
                    //console.log(page, index);
                    $timeout(function() {
                        if ($rootScope.pages[index]) {
                            $rootScope.currentPage = $rootScope.pages[index];
                        } else {
                            $rootScope.currentPage = $rootScope.pages[index - 1];
                        }
                    }, 10);
                };
                $scope.applyMaster = function(page) {
                    page.masterapplied = true;
                    console.log('page', page)
                    $timeout(function() {
                        page.masterapplied = false;
                    }, 2000);
                };
                $scope.applyMasterAll = function() {
                    console.log('master applied to all')
                    angular.forEach($rootScope.pages, function(page) {
                        if (!page.master) {
                            $scope.applyMaster(page);
                        }

                    });

                };

            }
        };
    });