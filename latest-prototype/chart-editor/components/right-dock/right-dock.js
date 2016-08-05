angular.module('rightDock', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    .controller('RightDockCtrl', function($scope, $rootScope) {
        $scope.openTab = "";
        $scope.showTooltipPresent = true;
        $scope.showTooltipHistory = true;

        $scope.closeRightDock = function() {
            if( !$scope.openTab ) {
                $rootScope.setTab('pageSettings');
            } else {
                $rootScope.setTab('');
            }
        };

        $rootScope.setTab = function(name) {

            if (name === $scope.openTab) { // is the tab already open?
                $scope.openTab = ""; // then empty the var
            } else {
                $scope.openTab = name; // set the tab
            }

            if ($scope.openTab === "comments") { // Turn on frames and comments
                $rootScope.showComments = true;
                $rootScope.showSlides = false;
            } else if ($scope.openTab === "present") {
                $rootScope.showSlides = true;
                $rootScope.showComments = false;
            } else {
                $rootScope.showComments = false;
                $rootScope.showSlides = false;
            }

            if ($scope.openTab === "") { // hide panel if no tab selected
                $scope.rightDock = false;
            } else { // show panel
                $scope.rightDock = true;
            }
        };
    })