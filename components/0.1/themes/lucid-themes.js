angular.module("lucidThemes", ['appConfig'])
    .directive('lucidThemes', function(config, $document, lucidThemesData) {
        return {
            restrict: 'E',
            scope: {
                selected: '=',
                currenttheme: '=',
            },
            replace: true,
            templateUrl: config.componentsURL + 'themes/lucid-themes.html',

            controller: function($scope, $rootScope) {

                $scope.themes = lucidThemesData;
                $scope.currenttheme = $scope.themes[0];
                $scope.viewthemes = false;

                $scope.switchTheme = function(theme) {
                    $rootScope.currentPage.canvasBG = theme.pagecolor;
                    $rootScope.currentPage.linecolor = theme.linecolor;

                    angular.forEach($rootScope.currentPage.blocks, function(block) {
                        if (block) {
                            if (block.customcolor) {
                                return;
                            }
                            var num = block.swatchnumber - 1;
                            var themeswatch = theme.swatches[num]; //get swatch from theme
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
                        }
                    });
                    //console.log(theme);
                };
            },

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.viewthemes = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    })
    .factory('lucidThemesData', function() {
        var lucidThemes = [{
            "name": "Standard",
            "pagecolor": "#ffffff",
            "linecolor": "#999999",
            "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/asset-default-theme-thumbnail_360.jpg",
            "swatches": [{
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#333333",
                    "border": "#666666"
                },
                "radius": 5
            }, {
                "swatch": {
                    "fill": "#999999",
                    "text": "#ffffff",
                    "border": "#999999"
                }
            }, {
                "swatch": {
                    "fill": "#cccccc",
                    "text": "#ffffff",
                    "border": "#cccccc"
                }
            }, {
                "swatch": {
                    "fill": "#ee5b42",
                    "text": "#ffffff",
                    "border": "#ee5b42"
                }
            }, {
                "swatch": {
                    "fill": "#6db7c4",
                    "text": "#ffffff",
                    "border": "#6db7c4"
                }
            }, {
                "swatch": {
                    "fill": "#a3d977",
                    "text": "#ffffff",
                    "border": "#a3d977"
                }
            }]

        }, {
            "name": "Blueprint",
            "pagecolor": "#4187ad",
            "linecolor": "#99d2f2",
            "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/asset-blueprint-theme-thumbnail_360.jpg",
            "swatches": [{
                "swatch": {
                    "fill": "#3b5878",
                    "text": "#ffffff",
                    "border": "#2d435c"
                },
                "shadow": {
                    "shadow": false,
                    "blur": 10,
                    "x": 2,
                    "y": 3,
                    "color": "rgba(0,0,0,0)"
                },
                "radius": 0
            }, {
                "swatch": {
                    "fill": "#99d2f2",
                    "text": "#ffffff",
                    "border": "#99d2f2"
                }
            }, {
                "swatch": {
                    "fill": "#999999",
                    "text": "#ffffff",
                    "border": "#999999"
                }
            }, {
                "swatch": {
                    "fill": "#ff8f80",
                    "text": "#3b5878",
                    "border": "#ff8f80"
                }
            }, {
                "swatch": {
                    "fill": "#ffdf71",
                    "text": "#3b5878",
                    "border": "#ffdf71"
                }
            }, {
                "swatch": {
                    "fill": "#a3d977",
                    "text": "#3b5878",
                    "border": "#a3d977"
                }
            }]

        }, {
            "name": "Boardroom",
            "pagecolor": "#3e3e3e",
            "linecolor": "#cccccc",
            "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/asset-boardroom-theme-thumbnail_360.jpg",
            "swatches": [{
                "swatch": {
                    "fill": "#666666",
                    "text": "#ffffff",
                    "border": "#999999"
                },
                "shadow": {
                    "shadow": false,
                    "blur": 10,
                    "x": 2,
                    "y": 3,
                    "color": "rgba(0,0,0,0)"
                },
                "radius": 0
            }, {
                "swatch": {
                    "fill": "#999999",
                    "text": "#ffffff",
                    "border": "#999999"
                }
            }, {
                "swatch": {
                    "fill": "#cccccc",
                    "text": "#ffffff",
                    "border": "#cccccc"
                }
            }, {
                "swatch": {
                    "fill": "#ee5b42",
                    "border": "#ee5b42",
                    "text": "#ffffff"
                }
            }, {
                "swatch": {
                    "fill": "#6db7c4",
                    "border": "#6db7c4",
                    "text": "#ffffff"
                },
            }, {
                "swatch": {
                    "fill": "#a3d977",
                    "text": "#ffffff",
                    "border": "#a3d977"
                }
            }]

        }, {
            "name": "Sandstorm",
            "pagecolor": "#fff9ed",
            "linecolor": "#999999",
            "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/asset-sandstorm-theme-thumbnail_360.jpg",
            "swatches": [{
                "swatch": {
                    "fill": "#ffe5b6",
                    "text": "#666666",
                    "border": "#666666"
                },
                "shadow": {
                    "shadow": false,
                    "blur": 10,
                    "x": 2,
                    "y": 3,
                    "color": "rgba(0,0,0,0)"
                },
                "radius": 0
            }, {
                "swatch": {
                    "fill": "#999999",
                    "text": "#ffffff",
                    "border": "#999999"
                }
            }, {
                "swatch": {
                    "fill": "#cccccc",
                    "text": "#ffffff",
                    "border": "#cccccc"
                }
            }, {
                "swatch": {
                    "fill": "#ee5b42",
                    "border": "#ee5b42",
                    "text": "#ffffff"
                }
            }, {
                "swatch": {
                    "fill": "#f0b74c",
                    "border": "#f0b74c",
                    "text": "#ffffff"
                },
            }, {
                "swatch": {
                    "fill": "#6db7c4",
                    "text": "#ffffff",
                    "border": "#6db7c4"
                }
            }]

        }];
        return lucidThemes;
    });