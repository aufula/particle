angular.module("lucidChartBlock", ['appConfig'])
    .directive('lucidChartBlock', function(config, shapesData) {
        return {
            restrict: 'E',
            scope: {
                block: '=',
                addsavedstyle: '=',
                currenttheme: '=',
            },
            replace: true,
            templateUrl: config.componentsURL + 'chart-block/lucid-chart-block.html',
            controller: function($scope) {
                $scope.shapegroups = shapesData;
                $scope.saveShape = function(data, shapegroup) {
                    var newblock = JSON.parse(JSON.stringify(data));

                    newblock.shapepanel = true;
                    newblock.customcolor = true;
                    newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
                    shapegroup.shapes.push(newblock);
                    //console.log("shape saved to shapegroup", newblock);
                };
                $scope.removeCustomColor = function(block) {

                    var num = block.swatchnumber - 1;
                    var themeswatch = $scope.currenttheme.swatches[num]; //get swatch from theme
                    //console.log(block);
                    //block.swatch = themeswatch.swatch

                    if (block.swatchtype === 'text') {
                        //console.log('this is text', block.swatchtype);
                        block.swatch.text = themeswatch.swatch.fill;
                        block.swatch.border = 'transparent';
                        block.swatch.fill = 'transparent';
                        //console.log(block.swatch);
                    }
                    if (block.swatchtype !== 'text') {
                        block.swatch.text = themeswatch.swatch.text;
                        block.swatch.border = themeswatch.swatch.border;
                        block.swatch.fill = themeswatch.swatch.fill;
                    }

                    //console.log(theme);
                };

            }
        };
    });