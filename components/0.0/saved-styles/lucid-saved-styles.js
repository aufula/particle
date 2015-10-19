angular.module("lucidSavedStyles", ['appConfig'])
    .directive('lucidSavedStyles', function(config, $document) {
        return {
            restrict: 'E',
            scope: false,
            replace: true,
            templateUrl: config.componentsURL + 'saved-styles/lucid-saved-styles.html',

            controller: function($scope) {
                $scope.compareSwatch = function(selected, theme) {
                    //console.log(JSON.stringify(selected) === JSON.stringify(theme));
                    return JSON.stringify(selected) === JSON.stringify(theme);
                };
                $scope.compareToSavedSwatches = function(swatch) {
                    var sameSwatch = 0;
                    angular.forEach($scope.savedstyles, function(savedstyle) {
                        if ($scope.compareSwatch(swatch, savedstyle)) {
                            sameSwatch += +1;
                        }
                    });
                    if (sameSwatch > 0) {
                        return false;
                    } else {
                        return true;
                    }
                };

                $scope.showpopup = false;
                $scope.toggleMenu = function() {
                    $scope.showpopup = !$scope.showpopup;
                };
                $scope.closeMenu = function() {
                    $scope.showpopup = false;
                };
            },

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopup = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    });