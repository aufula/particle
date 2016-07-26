angular.module('pages', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    .controller('PagesCtrl', function($scope, $timeout, $rootScope, pagesData) {
        $rootScope.pages = pagesData;
        $rootScope.currentPage = pagesData[0];
        $rootScope.currentPageNumber = 1;
        $scope.editName = function(page) {
            $timeout(function() {
                //console.log('edit?', shapegroup.edit);
                page.edit = true;
                //console.log('edit?', shapegroup.edit);
            }, 100)


        };
        $scope.changePage = function(page) {
            var resetPage = {
                name: page.name,
                blocks: []
            };
            // this is used to keep the name the same, and empty the blocks on the page
            // so that the blocks don't animate in every time the page loads.
            // used with ng-if on the ul of items on the canvas.
            $rootScope.currentPage = resetPage;
            $timeout(function() {
                $rootScope.currentPage = page;
                $rootScope.currentPageNumber = $rootScope.pages.indexOf(page) + 1;
                $rootScope.saveDocument();
            }, 10);
        };
        $scope.addPage = function() {
            var length = $rootScope.pages.length;
            var uniqueID = new Date().getTime();
            var newPage = {
                name: 'New Page ' + (+length + 1),
                id: uniqueID,
                blocks: [''] //empty block added so that the ul shows up
            };
            $rootScope.pages.splice(length, 0, newPage);
            $timeout(function() {
                $scope.changePage(newPage);
            }, 10); //delay so it selects after transition
        };
        $scope.duplicatePage = function(page, index) {
            var newPage = JSON.parse(JSON.stringify(page));
            var newindex = +index + 1;
            var uniqueID = new Date().getTime();

            newPage.id = uniqueID;
            newPage.name = page.name + ' Copy';
            $rootScope.pages.splice(newindex, 0, newPage);
            $timeout(function() {
                $scope.changePage(newPage);
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
                    $scope.changePage($rootScope.pages[index]);
                } else {
                    $scope.changePage($rootScope.pages[index - 1]);
                }
            }, 10);
            $rootScope.saveDocument();
        };

        $scope.nextPage = function() {
            var index = $rootScope.pages.indexOf($rootScope.currentPage);
            $scope.changePage($rootScope.pages[index + 1]);
        };
        $scope.previousPage = function() {
            var index = $rootScope.pages.indexOf($rootScope.currentPage);
            $scope.changePage($rootScope.pages[index - 1]);
        };
        $scope.applyMaster = function(page) {
            page.masterapplied = true;
            console.log('page', page);
            $timeout(function() {
                page.masterapplied = false;
            }, 2000);
            $rootScope.saveDocument();
        };
        $scope.applyMasterAll = function() {
            console.log('master applied to all');
            angular.forEach($rootScope.pages, function(page) {
                if (!page.master) {
                    $scope.applyMaster(page);
                }
            });

        };
        $rootScope.saveDocument();
    });