angular.module("lucidSavedStyles", ['appConfig'])
    .directive('lucidSavedStyles', function(config) {
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

                $scope.savedStyles = [];
                $scope.addSavedStyle = function(block) {
                    var savethis = {
                        "fill": block.swatch.fill,
                        "text": block.swatch.text,
                        "border": block.swatch.border
                    };
                    $scope.savedStyles.push(savethis);
                    //console.log(savethis);
                };
            }
        };
    });