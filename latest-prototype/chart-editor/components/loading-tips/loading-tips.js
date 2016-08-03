angular.module('loadingTips', [])
    .controller('loadingTipsCtrl', function($scope, $timeout) {
        $scope.loading = 0;
        $timeout(function() {
            $scope.loading = 100;
        }, 10);
        $timeout(function() {
            // $element.removeClass('hide-body');
            // $scope.$root.showbetatips = true; //removed for latest prototype
            $scope.$root.loaded = true;
        }, 4500);
        $scope.showTip = (Math.ceil(Math.random() * 3));
        $scope.newTip = function() {
            $scope.showTip = $scope.showTip + 1;
            if ($scope.showTip === 6) {
                $scope.showTip = 1;
            }
        };
    });