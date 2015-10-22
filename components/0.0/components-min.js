/*global angular : true fixes codekit error*/

//@codekit-append "canvas/lucid-canvas-data.js"
//@codekit-append "input-stepper/lucid-input-stepper.js"
//@codekit-append "color-picker/lucid-color-picker.js"
//@codekit-append "popover-menu/lucid-popover-menu.js"
//@codekit-append "path-style/lucid-path-style.js"
//@codekit-append "text-alignment/lucid-text-alignment.js"
//@codekit-append "more-drawer/lucid-more-drawer.js"
//@codekit-append "border-options/lucid-border-options.js"
//@codekit-append "text-options/lucid-text-options.js"
//@codekit-append "line-options/lucid-line-options.js"
//@codekit-append "position-options/lucid-position-options.js"
//@codekit-append "shadow-options/lucid-shadow-options.js"
//@codekit-append "modal/lucid-modal.js"
//@codekit-append "shape/lucid-shape.js"
//@codekit-append "finger-tabs/lucid-finger-tabs.js"
//@codekit-append "buttcon-popover/lucid-buttcon-popover.js"
//@codekit-append "notification/lucid-notification.js"
//@codekit-append "select/lucid-select.js"
//@codekit-append "button/lucid-button.js"
//@codekit-append "canvas/lucid-canvas.js"
//@codekit-append "chart-block/lucid-chart-block.js"
//@codekit-append "saved-styles/lucid-saved-styles.js"
//@codekit-append "themes/lucid-themes.js"
//@codekit-append "shape-group/lucid-shape-group.js"
//@codekit-append "shapes-manager/lucid-shapes-manager.js"
//@codekit-append "slides/lucid-slides.js"

angular.module('appConfig', [])

.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'http://lucidsoftware.github.io/particle/components/**'
    ]);
})

.constant("config", {
    //'componentsURL': "/components/0.0/" //local dev
    'componentsURL': "http://lucidsoftware.github.io/particle/components/0.0/" //github

});

angular.module("lucidComponents", ['ngAnimate', 'ngDraggable', 'lucidCanvasData', 'lucidTextAlignment', 'lucidInputStepper', 'lucidPopoverMenu', 'lucidColorPicker', 'lucidPathStyle', 'lucidMoreDrawer', 'lucidBorderOptions', 'lucidTextOptions', 'lucidLineOptions', 'lucidPositionOptions', 'lucidShadowOptions', 'lucidShape', 'lucidShapeGroup', 'lucidModal', 'lucidFingerTabs', 'lucidButtconPopover', 'lucidNotification', 'lucidSelect', 'lucidButton', 'lucidChartBlock', 'lucidCanvas', 'lucidShapesManager', 'lucidSavedStyles', 'lucidThemes', 'lucidSlides'])

.directive('ngdEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
})


////////////////////      REUSABLE DIRECTIVES      //////////////////////
//on enter
.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
})

//escape
.directive('escKey', function() {
    return function(scope, element, attrs) {
        element.bind('keydown keypress', function(event) {
            if (event.which === 27) { // 27 = esc key
                scope.$apply(function() {
                    scope.$eval(attrs.escKey);
                });

                event.preventDefault();
            }
        });
    };
})

//right click
.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {
                    $event: event
                });
            });
        });
    };
})


////////////////////      Filters      //////////////////////

///filter unique objects
.filter('unique', function() {

    return function(items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            //var hashCheck = {}, 
            var newItems = [];

            var extractValueToCompare = function(item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function(item) {
                //var valueToCheck, 
                var isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
})

//filter used to send svgs as html
.filter("sanitize", ['$sce', function($sce) {
    return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    };
}]);

/*global angular : true fixes codekit error*/
angular.module('lucidCanvasData', [])
    .factory('canvasData', function() {

        var blockElements = [{
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "comment": {
                "text": "yep this is a comment"
            },
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME 1",
                "size": "12px",
            },

            "padding": 5,
            "metrics": {
                "z": 2,
                "x": 390,
                "y": 139,
                "width": 120,
                "height": 45
            },
            "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'

        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 393,
                "y": 245,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 625,
                "y": 245,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 157,
                "y": 245,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 77,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 202,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "comment": {
                "text": "yep this is a comment"

            },
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 327,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 563,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ee5b42",
                "text": "#ffffff",
                "border": "#ee5b42"
            },
            "swatchnumber": 4,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 688,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME0",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 688,
                "y": 425,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 563,
                "y": 425,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#a3d977",
                "text": "#ffffff",
                "border": "#a3d977"
            },
            "swatchnumber": 5,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 563,
                "y": 515,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 262,
                "y": 425,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#6db7c4",
                "text": "#ffffff",
                "border": "#6db7c4"
            },
            "swatchnumber": 6,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 137,
                "y": 425,
                "width": 120,
                "height": 45
            },

        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#6db7c4",
                "text": "#ffffff",
                "border": "#6db7c4"
            },
            "swatchnumber": 6,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "",
                "size": "12px",
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "font": "Source Sans Pro",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 591,
                "y": 626,
                "width": 22,
                "height": 22
            },
            "radius": 15,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#a3d977",
                "text": "#ffffff",
                "border": "#a3d977"
            },
            "swatchnumber": 5,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "",
                "size": "12px",
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "font": "Source Sans Pro",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 433,
                "y": 626,
                "width": 22,
                "height": 22
            },
            "radius": 15,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ee5b42",
                "text": "#ffffff",
                "border": "#ee5b42"
            },
            "swatchnumber": 4,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "",
                "size": "12px",
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "font": "Source Sans Pro",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 245,
                "y": 626,
                "width": 22,
                "height": 22
            },
            "radius": 15,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#ee5b42",
                "border": "transparent"
            },
            "swatchtype": "text",
            "swatchnumber": 4,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "5+ YEAR TENURE",
                "size": "13px",
                "verticalalignment": "middle",
                "horizontalalignment": "left",
                "font": "Oswald, sans-serif",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 272,
                "y": 625,
                "width": 150,
                "height": 22
            },
            "radius": 0,
            "z": 2
        }, {
            "swatchtype": "text",
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#a3d977",
                "border": "transparent"
            },
            "swatchnumber": 5,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "NEW HIRE (MONTHS)",
                "size": "13px",
                "verticalalignment": "middle",
                "horizontalalignment": "left",
                "font": "Oswald, sans-serif",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 463,
                "y": 625,
                "width": 125,
                "height": 22
            },
            "radius": 0,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#6db7c4",
                "border": "transparent"
            },
            "swatchnumber": 6,
            "borderwidth": 3,
            "borderstyle": "solid",
            "swatchtype": "text",
            "text": {
                "text": "INTERN",
                "size": "13px",
                "verticalalignment": "middle",
                "horizontalalignment": "left",
                "font": "Oswald, sans-serif",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 617,
                "y": 625,
                "width": 125,
                "height": 22
            },
            "radius": 0,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#999999",
                "border": "transparent"
            },
            "swatchnumber": 2,
            "borderwidth": 3,
            "swatchtype": "text",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "COMPANY NAME",
                "size": "24px",
                "weight": "light",
                "letterspacing": "0px",
                "font": "Oswald, sans-serif"
            },

            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 342,
                "y": 15,
                "width": 220,
                "height": 35
            },
            "radius": 0
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#999999",
                "border": "transparent"
            },
            "swatchnumber": 2,
            "borderwidth": 3,
            "swatchtype": "text",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "DEPARTMENT NAME",
                "size": "12px",
                "weight": "light",
                "letterspacing": "-1px",
                "font": "sans-serif"
            },

            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 342,
                "y": 53,
                "width": 220,
                "height": 14
            },
            "radius": 0
        }];
        return blockElements;
    })


///stores themes data
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

angular.module('lucidInputStepper', ['appConfig'])
    .directive('lucidInputStepper', function(config) {
        return {
            restrict: 'AE',
            scope: {
                unit: '@',
                step: '@',
                number: '=',
                width: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'input-stepper/lucid-input-stepper.html',
            controller: function($scope) {
                $scope.stepUp = function() {
                    $scope.number = parseInt($scope.number) + parseInt($scope.step);
                };
                $scope.stepDown = function() {
                    $scope.number = parseInt($scope.number) + parseInt(-$scope.step);
                };
            }
        };
    });

/*global angular : true fixes codekit error*/
angular.module("lucidColorPicker", ['appConfig'])
    .directive('lucidColorPicker', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                selected: '=',
            },
            replace: false,
            templateUrl: config.componentsURL + 'color-picker/lucid-color-picker.html',

            controller: function($scope) {

                //$scope.blockElements = canvasData;
                $scope.selected = {
                    "swatchnumber": 1,
                    "borderwidth": 3,
                    "borderstyle": "solid",
                    "swatch": {
                        "fill": "#ffffff",
                        "text": "#868686",
                        "border": "#868686"
                    },
                    "text": {
                        "verticalalignment": "middle",
                        "horizontalalignment": "center",
                        "text": "EMPLOYEE NAME",
                        "size": "12px",
                    },

                    "padding": 10,
                    "metrics": {
                        "z": 2,
                        "x": 390,
                        "y": 139,
                        "width": 120,
                        "height": 45
                    }
                };
                $scope.opacity = '100%';
                $scope.swatchpanel = 'Fill';
                $scope.showpopup = false;
                $scope.showColorDrawer = false;
                $scope.toggleMenu = function() {
                    $scope.showpopup = !$scope.showpopup;
                    //console.log($scope.showpopup);
                };
                $scope.closeMenu = function() {
                    $scope.showpopup = false;
                    //console.log('close menu');
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
    })
    .directive('lucidColorPickerOptions', function() {
        return {
            restrict: 'E',
            scope: {
                color: '=',
            },
            template: '<div class="swatch-colors">' +
                '                <ul class="lucid-grayscale-colors">' +
                '                    <li class="lucid-square lucid-transparent" ng-click="color = \'transparent\'; selected.customcolor=true">' +
                '                        <div class="lucid-selected-color" ng-class="{\'lucid-selected\': color == \'transparent\'}">' +
                '                            <div class="lucid-inset-shadow"></div>' +
                '                        </div>' +
                '                    </li>' +
                '                    <li class="lucid-square blank"></li>' +
                '                    <li class="lucid-square blank"></li>' +
                '                    <li class="lucid-square" ng-repeat="color in lucidcolorpickergrayscale" style="background-color:{{color.hex}}" ng-click="$parent.color = color.hex; $parent.selected.customcolor=true">' +
                '                        <div class="lucid-selected-color" ng-class="{\'lucid-selected\': $parent.color == color.hex}">' +
                '                            <div class="lucid-inset-shadow"></div>' +
                '                        </div>' +
                '                    </li>' +
                '                </ul>' +
                '                <ul class="lucid-colorpicker-colors">' +
                '                    <li class="lucid-square" ng-repeat="color in lucidcolorpickercolors" style="background-color:{{color.hex}}" ng-click="$parent.color = color.hex; $parent.selected.customcolor=true">' +
                '                        <div class="lucid-selected-color" ng-class="{\'lucid-selected\': $parent.color == color.hex}">' +
                '                            <div class="lucid-inset-shadow"></div>' +
                '                        </div>' +
                '                    </li>' +
                '                </ul>' +
                '            </div>',
            controller: function($scope) {
                $scope.lucidcolorpickergrayscale = [{
                    "hex": "#ffffff",
                }, {
                    "hex": "#c0c0c0",
                }, {
                    "hex": "#868686",
                }, {
                    "hex": "#535353",
                }, {
                    "hex": "#262626",
                }, {
                    "hex": "#000000",
                }];
                $scope.lucidcolorpickercolors = [{
                    "hex": "#4e1a54"
                }, {
                    "hex": "#a41553"
                }, {
                    "hex": "#83001e",
                }, {
                    "hex": "#bd5318",
                }, {
                    "hex": "#d59f20",
                }, {
                    "hex": "#3f7931",
                }, {
                    "hex": "#12513d",
                }, {
                    "hex": "#15597c",
                }, {
                    "hex": "#163870",
                }, {
                    "hex": "#6c2e76",
                }, {
                    "hex": "#ce4673",
                }, {
                    "hex": "#b5172b",
                }, {
                    "hex": "#e47810",
                }, {
                    "hex": "#f7b61f",
                }, {
                    "hex": "#6da931",
                }, {
                    "hex": "#258569",
                }, {
                    "hex": "#3695d6",
                }, {
                    "hex": "#1769ad",
                }, {
                    "hex": "#a07da6",
                }, {
                    "hex": "#eda3bc",
                }, {
                    "hex": "#ee5b42",
                }, {
                    "hex": "#fab45d",
                }, {
                    "hex": "#fcd758",
                }, {
                    "hex": "#97d25f",
                }, {
                    "hex": "#52ad95",
                }, {
                    "hex": "#6db7c4",
                }, {
                    "hex": "#74acdf",
                }, {
                    "hex": "#d1bcd2",
                }, {
                    "hex": "#f9d2de",
                }, {
                    "hex": "#ffbbb1",
                }, {
                    "hex": "#ffdba9",
                }, {
                    "hex": "#ffeca9",
                }, {
                    "hex": "#c7e8ac",
                }, {
                    "hex": "#99d5ca",
                }, {
                    "hex": "#c1e4f7",
                }, {
                    "hex": "#b2d6ef",
                }];

            }
        };
    });

angular.module("lucidPopoverMenu", ['appConfig'])
    .directive('lucidPopoverMenu', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                width: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'popover-menu/lucid-popover-menu.html',

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopover = false;
                        //console.log("hide popup", e.target.className);
                        scope.$apply();
                    }
                });
            }
        };
    }); 

/*global angular : true fixes codekit error*/
/*global SVGMorpheus : true fixes codekit error*/
angular.module("lucidPathStyle", ['appConfig'])
    .directive('lucidPathStyle', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                icon: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'path-style/lucid-path-style.html',

            controller: function($scope) {
                var lucidPath = new SVGMorpheus('#lucid-path-style');
                $scope.changePath = function(path) {
                    if (path === 'straight') {
                        lucidPath.to('lucid-straight-path', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (path === 'curved') {
                        lucidPath.to('lucid-curve-path', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (path === 'angle') {
                        lucidPath.to('lucid-angle-path', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    $scope.showpopover = false;
                };
                $scope.pathstyles = [{
                    "name": "curved",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-line-curved-bluesteel.svg",
                }, {
                    "name": "angle",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-line-angle-bluesteel.svg",
                }, {
                    "name": "straight",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-line-straight-bluesteel.svg",
                }];
                $scope.pathstyle = $scope.pathstyles[0];

            },

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopover = false;
                        scope.$apply();
                    }
                });
            }
        };
    });

/*global angular : true fixes codekit error*/
/*global SVGMorpheus : true fixes codekit error*/
angular.module('lucidTextAlignment', ['appConfig'])
    .directive('lucidTextAlignment', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'text-alignment/lucid-text-alignment.html',

            controller: function($scope) {

                var lucidPath = new SVGMorpheus('#lucid-text-align');
                //set default state if no object is selected
                    if(!$scope.selected){
                        $scope.selected={};
                        $scope.selected.text={
                            "verticalalignment": "middle",
                            "horizontalalignment": "center"
                        };
                    }

                $scope.changeAlignment = function(vertical, horizontal) {
                    $scope.selected.text.verticalalignment = vertical;
                    $scope.selected.text.horizontalalignment = horizontal;
                    if (vertical === 'top' && horizontal === 'left') {
                        lucidPath.to('lucid-text-top-left', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });

                    }
                    if (vertical === 'top' && horizontal === 'center') {
                        lucidPath.to('lucid-text-top-center', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'top' && horizontal === 'right') {
                        lucidPath.to('lucid-text-top-right', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    //middle
                    if (vertical === 'middle' && horizontal === 'left') {
                        lucidPath.to('lucid-text-middle-left', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'middle' && horizontal === 'center') {
                        lucidPath.to('lucid-text-middle-center', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'middle' && horizontal === 'right') {
                        lucidPath.to('lucid-text-middle-right', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }

                    //bottom

                    if (vertical === 'bottom' && horizontal === 'left') {
                        lucidPath.to('lucid-text-bottom-left', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'bottom' && horizontal === 'center') {
                        lucidPath.to('lucid-text-bottom-center', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'bottom' && horizontal === 'right') {
                        lucidPath.to('lucid-text-bottom-right', {
                            duration: 300,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    $scope.showpopup = false;

                };
                $scope.alignment = [{
                    "verticalalignment": "top",
                    "horizontalalignment": "left",
                    "name": "top-left",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_top-left-bluesteel.svg",
                }, {
                    "verticalalignment": "top",
                    "horizontalalignment": "center",
                    "name": "top-center",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_top-center-bluesteel.svg",
                }, {
                    "verticalalignment": "top",
                    "horizontalalignment": "right",
                    "name": "top-right",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_top-right-bluesteel.svg",
                }, {
                    "verticalalignment": "middle",
                    "horizontalalignment": "left",
                    "name": "center-left",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_center-left-bluesteel.svg",
                }, {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "name": "center-center",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_center-center-bluesteel.svg",
                }, {
                    "verticalalignment": "middle",
                    "horizontalalignment": "right",
                    "name": "center-right",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_center-right-bluesteel.svg",
                }, {
                    "verticalalignment": "bottom",
                    "horizontalalignment": "left",
                    "name": "bottom-left",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_bottom-left-bluesteel.svg",
                }, {
                    "verticalalignment": "bottom",
                    "horizontalalignment": "center",
                    "name": "bottom-center",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_bottom-center-bluesteel.svg",
                }, {
                    "verticalalignment": "bottom",
                    "horizontalalignment": "right",
                    "name": "bottom-right",
                    "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_bottom-right-bluesteel.svg",

                }];
            },

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopup = false;
                        scope.$apply();
                    }
                });
            }
        };
    });

angular.module("lucidMoreDrawer", ['appConfig'])
    .directive('lucidMoreDrawer', function(config) {
        return {
            restrict: 'E',
            scope: {
                showdrawer: '=',
                height: '@',
                tophandle: '@',
                more: '@',
                less:'@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'more-drawer/lucid-more-drawer.html',
            compile: function(element, attrs) {
                if (!attrs.more){
                    attrs.more = 'More';
                }
                if (!attrs.less){
                    attrs.less = 'Less';
                }
            }
        };
    }); 

angular.module('lucidBorderOptions', ['appConfig'])
    .directive('lucidBorderOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'border-options/lucid-border-options.html',
        };
    });

angular.module('lucidTextOptions', ['appConfig'])
    .directive('lucidTextOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'text-options/lucid-text-options.html',
        };
    });

angular.module('lucidLineOptions', ['appConfig'])
    .directive('lucidLineOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'line-options/lucid-line-options.html',
        };
    });

angular.module('lucidPositionOptions', ['appConfig'])
    .directive('lucidPositionOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'position-options/lucid-position-options.html',
        };
    });

angular.module('lucidShadowOptions', ['appConfig'])
    .directive('lucidShadowOptions', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '='
            },
            replace: false,
            templateUrl: config.componentsURL + 'shadow-options/lucid-shadow-options.html',
        };
    });

angular.module("lucidModal", ['appConfig'])
    .directive('lucidModal', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                showmodal: '=',
                width: '@',
                height: '@',
                title: '@',
                confirm: '@',
                cancel: '@',
                icon: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'modal/lucid-modal.html',

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopover = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    }); 

angular.module('lucidShape', ['appConfig'])
    .directive('lucidShape', function(config) {
        return {
            restrict: 'E',
            scope: {
                shape: '@',
                fill: '@',
                strokecolor: '@',
                textcolor: '@',
                width: '@',
                height: '@',
                strokewidth: '@',
                radius: '@'

                // color: '=',
                // line: '=',
                // text: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'shape/lucid-shape.html',
            compile: function(element, attrs) {
                if (!attrs.shape) {
                    attrs.shape = 'block';
                }

                if (!attrs.fill) {
                    attrs.fill = '#fff';
                }

                if (!attrs.strokecolor) {
                    attrs.strokecolor = '#999';
                }

                if (!attrs.textcolor) {
                    attrs.textcolor = '#333';
                }

                if (!attrs.width) {
                    attrs.width = '28';
                }

                if (!attrs.height) {
                    attrs.height = '28';
                }

                if (!attrs.strokewidth) {
                    attrs.strokewidth = '2';
                }

                if (!attrs.radius) {
                    attrs.radius = '2';
                }

            }

        };
    });

angular.module("lucidFingerTabs", ['appConfig'])
.directive('lucidFingerTabs', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'finger-tabs/lucid-finger-tabs.html',
            scope: { 
            },
            transclude: true,
            controller: ['$scope', function($scope) {
                $scope.tabs = [];

                this.addTab = function(tab) {
                    $scope.tabs.push(tab);
                };

                $scope.selectTab = function(tab) {
                    for (var i = 0; i < $scope.tabs.length; i++) {
                        if (tab.name !== $scope.tabs[i].name) {
                            $scope.tabs[i].selected = false;
                        } else {
                            $scope.tabs[i].selected = true;
                        }
                    }
                };
            }]
        };
    })
    .directive('lucidFingerTab', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'finger-tabs/lucid-finger-tab.html',
            transclude: true,
            replace: true,
            scope: {
                name: '@name',
                icon: '@icon',
                iconselected: '@iconselected'
            },
            require: '^lucidFingerTabs',
            link: function(scope, element, attrs, ctrl) {
                scope.selected = attrs.selected === "" || attrs.selected === true;
                ctrl.addTab(scope);
            }
        };
    });

angular.module("lucidButtconPopover", ['appConfig'])
    .directive('lucidButtconPopover', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                icon: '@',
                width: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'buttcon-popover/lucid-buttcon-popover.html',
            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopover = false;
                        //console.log("hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    }); 

angular.module("lucidNotification", ['appConfig'])
    .directive('lucidNotification', function(config) {
        return {
            restrict: 'E',
            scope: {
                type: '@',
                button: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'notification/lucid-notification.html',
        };
    }); 

angular.module("lucidSelect", ['appConfig'])
    .directive('lucidSelect', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                options: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'select/lucid-select.html',

            controller: function($scope) {
                $scope.selectedOption = $scope.options[0];
            },

            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showdropdown = false;
                        scope.$apply();
                    }
                });
            }
        };
    });

angular.module("lucidButton", ['appConfig'])
    .directive('lucidButton', function(config) {
        return {
            restrict: 'E',
            scope: {
                color: '@',
                icon: '@',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'button/lucid-button.html',
        };
    }); 

angular.module("lucidCanvas", ['appConfig'])
    .directive('lucidCanvas', function(config, canvasData) {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: config.componentsURL + 'canvas/lucid-canvas.html',
            controller: function($scope) {

                $scope.defaultBlock = {
                    "text": {
                        "verticalalignment": "middle",
                        "horizontalalignment": "center",
                        "text": "",
                        "size": "12px"
                    },
                    "swatch": {
                        "fill": "#FFFFFF",
                        "text": "#333",
                        "border": "#333"
                    },
                    "padding": 10,
                    "metrics": {
                        "z": 2,
                        "x": 390,
                        "y": 139,
                        "width": 120,
                        "height": 45
                    }
                };
                $scope.blockElements = canvasData;
                $scope.editThisBlock = function(block) {
                    $scope.selectedBlock = block;
                    //console.log(block.swatch);
                };
                $scope.onDropComplete = function(data, event) {
                    if (data && !$scope.manageShapes) {
                        var index = $scope.blockElements.indexOf(data);
                        //console.log('shape', index);
                        if (index === -1) {
                            var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                            var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;
                            //data.metrics = {};
                            //console.log(data, event);
                            data.metrics.x = event.x - canvasX - data.metrics.width / 2; //center block as it drops on canvas and expands
                            data.metrics.y = event.y - canvasY - data.metrics.height / 2;

                            var newblock = JSON.parse(JSON.stringify(data));
                            $scope.blockElements.push(newblock);
                            //console.log('dropped on canvas', newblock, 'current array', $scope.blockElements);
                        }

                    }

                };
                $scope.onDragSuccess = function(data, event) {
                    if (event.x > 250) {
                        var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                        var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;
                        //console.log('drag success', data, event);
                        if (data) {
                            data.metrics.x = event.x - canvasX - event.element.centerX;
                            data.metrics.y = event.y - canvasY - event.element.centerY;
                            data.shapepanel = false;
                        }
                    }
                    // if (event.x < 220) {
                    //     console.log('dropped in shapes'); //not sure how else to fix this.
                    // }
                    //console.log(data.metrics.x, data.metrics.y);
                    //console.log('drag success');
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
                $scope.lucidBackgroundColor = '#FFF';
                $scope.switchTheme = function(theme) {
                    $scope.lucidBackgroundColor = theme.pagecolor;
                    $scope.lucidLineColor = theme.linecolor;

                    angular.forEach($scope.blockElements, function(block) {
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
                $scope.lucidLineColor = "#999999";
                $scope.lucidLines = [{
                    "points": "450 184 450 240",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "450 184 450 213 217 213 217 240",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "450 184 450 213 686 213 686 240",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "217 290 217 313 135 313 135 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "217 290 217 313 260 313 260 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "217 290 217 313 388 313 388 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "686 290 686 313 622 313 622 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "686 290 686 313 747 313 747 330",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "260 380 260 402 193 402 193 420",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "260 380 260 402 320 402 320 420",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "622 380 622 420",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "622 380 622 402 747 402 747 420",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "622 470 622 510",
                    "endarrow": true,
                    "width": 2
                }, {
                    "points": "6 78 894 78",
                    "width": 1
                }, {
                    "points": "6 616 894 616",
                    "width": 1
                }, {
                    "points": "6 659 894 659",
                    "width": 1
                }];
            }
        };
    });

angular.module("lucidChartBlock", ['appConfig'])
    .directive('lucidChartBlock', function(config, $document, shapesData) {
        return {
            restrict: 'E',
            scope: {
                block: '=',
                selected: '=',
                addsavedstyle: '=',
                showcomments: '=',
                currenttheme: '=',
                contextmenu: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'chart-block/lucid-chart-block.html',
            controller: function($scope) {
                $scope.shapegroups = shapesData;
                $scope.saveShape = function(data, shapegroup) {

                    //var newblock = JSON.parse(JSON.stringify(selected));
                    //console.log(selected, shapegroup);
                    //$scope.shapegroups.shapegroup.shapes.push(newblock);

                    //var index = $scope.shapegroups.shapegroup.indexOf(data);
                    //console.log(index);
                    var newblock = JSON.parse(JSON.stringify(data));

                    newblock.shapepanel = true;
                    newblock.customcolor = true;
                    newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
                    shapegroup.shapes.push(newblock);
                    //console.log("shape saved to shapegroup", newblock);
                };

                $scope.showcontextMenu = false;
                $scope.showcontextMenuPosition = function(block) {
                    function getPosition(e) {
                        var posx = 0;
                        var posy = 0;

                        if (!e) {
                            var e = window.event;
                        }

                        if (e.pageX || e.pageY) {
                            posx = e.pageX;
                            posy = e.pageY;
                        } else if (e.clientX || e.clientY) {
                            posx = e.clientX + document.body.scrollLeft +
                                document.documentElement.scrollLeft;
                            posy = e.clientY + document.body.scrollTop +
                                document.documentElement.scrollTop;
                        }
                        //console.log(posx, posy)
                        return {
                            x: posx,
                            y: posy
                        };
                    }
                    if ($scope.selected === block) {
                        $scope.showcontextMenu = true;
                        var menuPosition = getPosition();
                        $scope.contextMenu = {};
                        $scope.contextMenu.left = menuPosition.x;
                        $scope.contextMenu.top = menuPosition.y;
                        // console.log($scope.contextMenu);
                    }
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

            },
            link: function(scope, el) {
                el.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.edittext = false;
                        event.preventDefault();
                    }
                });
                el.bind('mousedown', function() {
                    //e.stopPropagation();
                    //console.log(e);
                    //scope.selected = scope.block;
                    scope.$root.selectedBlock = scope.block;
                    console.log(scope.block);
                    //scope.$root.changealignment(scope.block.text.verticalalignment, scope.block.text.horizontalalignment);
                    scope.edittext = false;
                });
                el.bind('contextmenu', function() {
                    scope.showcontextMenu = true;
                    scope.edittext = false;
                });
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showcontextMenu = false;
                        scope.edittext = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
                $document.on('contextmenu', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showcontextMenu = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    });

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

angular.module("lucidThemes", ['appConfig'])
    .directive('lucidThemes', function(config, $document, lucidThemesData) {
        return {
            restrict: 'E',
            scope: {
                selected: '=',
                currenttheme: '=',
                switchtheme: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'themes/lucid-themes.html',

            controller: function($scope) {

                $scope.themes = lucidThemesData;
                $scope.currenttheme = $scope.themes[0];
                $scope.viewthemes = false;
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

angular.module('lucidShapeGroup', ['appConfig', 'dndLists'])
    .directive('lucidShapeGroup', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                name: '@',
                shapes: '=',
                custom: '@'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'shape-group/lucid-shape-group.html',
            controller: function($scope) {
                // $scope.onDropComplete = function(data, event, shapegroup) {
                //     //e.stopPropagation(); is there a way to stop this from happening on canvas? (shape manager)
                //     if (data) {
                //         var index = shapegroup.shapes.indexOf(data);
                //         //console.log('shape', index);

                //         if (index === -1) {
                //             //var index = $scope.shapegroups.shapegroup.indexOf(data);
                //             //console.log(index);
                //             var newblock = JSON.parse(JSON.stringify(data));

                //             newblock.shapepanel = true;
                //             newblock.customcolor = true;
                //             if (!newblock.url) {
                //                 //this is here so that we can save any shape from the library for reuse.
                //                 newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
                //             }
                //             shapegroup.shapes.push(newblock);
                //             //console.log("shape saved to shapegroup", newblock);
                //         }
                //     }
                // };
                
                //from demo
                if ($scope.custom){
                    $scope.dragEffect = 'copyMove';
                }
                else {
                    $scope.dragEffect = 'copy';
                }

                $scope.dragoverCallback = function(event, index, external, type) {
                    $scope.logListEvent('dragged over', event, index, external, type);
                    // Disallow dropping in the third row. Could also be done with dnd-disable-if.
                    return index; // < 10;
                };

                $scope.dropCallback = function(event, index, item, external, type, allowedType) {
                    $scope.logListEvent('dropped at', event, index, external, type);
                    if (external) {
                        if (allowedType === 'shape') return false;
                        //if (allowedType === 'containerType' && !angular.isArray(item)) return false;
                    }
                    return item;
                };

                $scope.logEvent = function(message, event) {
                    console.log(message, '(triggered by the following', event.type, 'event)');
                    console.log(event);
                };

                $scope.logListEvent = function(action, event, index, external, type) {
                    var message = external ? 'External ' : '';
                    message += type + ' element is ' + action + ' position ' + index;
                    $scope.logEvent(message, event);
                };
            }
        };
    });

angular.module("lucidShapesManager", ['appConfig'])
    .directive('lucidShapesManager', function(config, shapesData, pinnedShapes) {
        return {
            restrict: 'E',
            scope: {
                selected: '=',
                manageshapes: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'shapes-manager/lucid-shapes-manager.html',
            controller: function($scope) {
                $scope.shapegroups = shapesData;
                $scope.pinnedgroups = pinnedShapes;
                $scope.newCustomGroup = function() {
                    var newGroup = {
                        "groupname": "Shape Group Name",
                        "custom": true
                    };
                    $scope.shapegroups.splice(0, 0, newGroup);
                }
                $scope.pinShapeGroup = function(item) {
                    $scope.$broadcast('content.changed', 1000);
                    item.pinned = true;
                    return item;
                };
                $scope.unPinShapeGroup = function(item) {
                    $scope.$broadcast('content.changed', 1000);
                    item.pinned = false;
                    return item;
                };
                $scope.$evalAsync(function() {
                    $scope.$broadcast('content.changed', 1000);
                });

                //from demo
                $scope.dragoverCallback = function(event, index, external, type) {
                    $scope.logListEvent('dragged over', event, index, external, type);
                    // Disallow dropping in the third row. Could also be done with dnd-disable-if.
                    return index; // < 10;
                };

                $scope.dropCallback = function(event, index, item, external, type, allowedType) {
                    $scope.logListEvent('dropped at', event, index, external, type);
                    if (external) {
                        //if (allowedType === 'itemType' && !item.label) return false;
                        if (allowedType === 'containerType' && !angular.isArray(item)) return false;
                    }
                    return item;
                };

                $scope.logEvent = function(message, event) {
                    console.log(message, '(triggered by the following', event.type, 'event)');
                    console.log(event);
                };

                $scope.logListEvent = function(action, event, index, external, type) {
                    var message = external ? 'External ' : '';
                    message += type + ' element is ' + action + ' position ' + index;
                    $scope.logEvent(message, event);
                };
            }
        };
    })
    .factory('pinnedShapes', function() {

        var pinnedShapes = [{
            "groupname": "My Saved Shapes",
            "shapes": [{
                "name": "text",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-text.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-fill-text" sketch:type="MSArtboardGroup" font-size="29" font-family="Baskerville" fill="#828282" font-weight="526"><text id="T" sketch:type="MSTextLayer"><tspan x="5" y="25">T</tspan></text></g></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatchtype": "text",
                "swatch": {
                    "fill": "transparent",
                    "text": "#8D8D8D",
                    "border": "transparent"
                },
                "swatchnumber": 2,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "INSERT TEXT",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }],
            "custom": true,
            "pinned": true
        }, {
            "groupname": "Standard",
            "shapes": [{
                "name": "text",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-text.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-fill-text" sketch:type="MSArtboardGroup" font-size="29" font-family="Baskerville" fill="#828282" font-weight="526"><text id="T" sketch:type="MSTextLayer"><tspan x="5" y="25">T</tspan></text></g></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatchtype": "text",
                "swatch": {
                    "fill": "transparent",
                    "text": "#8D8D8D",
                    "border": "transparent"
                },
                "swatchnumber": 2,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "INSERT TEXT",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                },
            }, {
                "name": "block",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-block.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Rectangle-32-+-T-Copy-2" sketch:type="MSLayerGroup" transform="translate(1.000000, 2.000000)"class="lucid-shapes-fill-stroke"  stroke="#979797" fill="#FFFFFF"><rect stroke-width="2" sketch:type="MSShapeGroup" x="0" y="0" width="28" height="26" rx="2"></rect><text id="T-Copy" sketch:type="MSTextLayer" font-family="Baskerville" font-size="18" font-weight="526" fill="#828282"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#A1A1A1",
                    "border": "#A1A1A1"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Text",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }, {
                "name": "note",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-note.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Group-Copy-3" sketch:type="MSLayerGroup" transform="translate(2.000000, 1.6)"><path d="M0,0.399535424 L18,0.399535424 L26,8.39953542 L26,26.3995354 L0,26.3995354 L0,0.399535424 Z" id="Rectangle-32-Copy-2" fill="#FFCF54" sketch:type="MSShapeGroup"></path><path d="M2,2.39953542 C2,2.39953542 19.0546875,2.417638 19,2.39953542 L24,8.51064654 L24,24.3995354 L2,24.3995354 L2,2.39953542 Z" id="Rectangle-40" fill="#FFDD87" sketch:type="MSShapeGroup"></path><rect id="Rectangle-398-Copy-9" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="7.39953542" width="8" height="2"></rect><rect id="Rectangle-398-Copy-7" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="12.3995354" width="14" height="2"></rect><rect id="Rectangle-398-Copy-8" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="17.3995354" width="10" height="2"></rect><path d="M18,0.399535424 L18,8.39953542 L26,8.39953542 L18,0.399535424 Z" id="Path-748" fill="#F8C136" sketch:type="MSShapeGroup"></path></g></svg>',

                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "#FFE192",
                    "text": "#CCA330",
                    "border": "#FFD55E"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Note",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }, {
                "name": "hotspot",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-hotspot.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Artboard-4" sketch:type="MSArtboardGroup" fill="#019281"><rect id="Rectangle-32" fill-opacity="0.400000006" sketch:type="MSShapeGroup" x="2" y="2" width="26" height="26" rx="4"></rect><path d="M14.406079,7 L19.3938968,7 L15.0462468,13.8583375 L20.5,13.8583373 L12.4175106,24.3948897 L15.4176795,16.9625774 L9.5,16.9625774 L14.406079,7 Z" id="Path-696-Copy" sketch:type="MSShapeGroup"></path></g></svg>',
                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "rgba(78, 202, 186, 0.5)",
                    "text": "transparent",
                    "border": "transparent"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 75
                }
            }],
            "pinned": true

        }, {
            "groupname": "Flowchart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true
        }];
        return pinnedShapes
    })
    .factory('shapesData', function() {

        var lucidShapes = [{
            "groupname": "My Saved Shapes",
            "shapes": [{
                "name": "text",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-text.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-fill-text" sketch:type="MSArtboardGroup" font-size="29" font-family="Baskerville" fill="#828282" font-weight="526"><text id="T" sketch:type="MSTextLayer"><tspan x="5" y="25">T</tspan></text></g></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatchtype": "text",
                "swatch": {
                    "fill": "transparent",
                    "text": "#8D8D8D",
                    "border": "transparent"
                },
                "swatchnumber": 2,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "INSERT TEXT",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }],
            "custom": true,
            "pinned": true
        }, {
            "groupname": "Standard",
            "shapes": [{
                "name": "text",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-text.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-fill-text" sketch:type="MSArtboardGroup" font-size="29" font-family="Baskerville" fill="#828282" font-weight="526"><text id="T" sketch:type="MSTextLayer"><tspan x="5" y="25">T</tspan></text></g></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatchtype": "text",
                "swatch": {
                    "fill": "transparent",
                    "text": "#8D8D8D",
                    "border": "transparent"
                },
                "swatchnumber": 2,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "INSERT TEXT",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                },
            }, {
                "name": "block",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-block.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Rectangle-32-+-T-Copy-2" sketch:type="MSLayerGroup" transform="translate(1.000000, 2.000000)"class="lucid-shapes-fill-stroke"  stroke="#979797" fill="#FFFFFF"><rect stroke-width="2" sketch:type="MSShapeGroup" x="0" y="0" width="28" height="26" rx="2"></rect><text id="T-Copy" sketch:type="MSTextLayer" font-family="Baskerville" font-size="18" font-weight="526" fill="#828282"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#A1A1A1",
                    "border": "#A1A1A1"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Text",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }, {
                "name": "note",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-note.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Group-Copy-3" sketch:type="MSLayerGroup" transform="translate(2.000000, 1.6)"><path d="M0,0.399535424 L18,0.399535424 L26,8.39953542 L26,26.3995354 L0,26.3995354 L0,0.399535424 Z" id="Rectangle-32-Copy-2" fill="#FFCF54" sketch:type="MSShapeGroup"></path><path d="M2,2.39953542 C2,2.39953542 19.0546875,2.417638 19,2.39953542 L24,8.51064654 L24,24.3995354 L2,24.3995354 L2,2.39953542 Z" id="Rectangle-40" fill="#FFDD87" sketch:type="MSShapeGroup"></path><rect id="Rectangle-398-Copy-9" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="7.39953542" width="8" height="2"></rect><rect id="Rectangle-398-Copy-7" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="12.3995354" width="14" height="2"></rect><rect id="Rectangle-398-Copy-8" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="17.3995354" width="10" height="2"></rect><path d="M18,0.399535424 L18,8.39953542 L26,8.39953542 L18,0.399535424 Z" id="Path-748" fill="#F8C136" sketch:type="MSShapeGroup"></path></g></svg>',

                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "#FFE192",
                    "text": "#CCA330",
                    "border": "#FFD55E"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Note",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }, {
                "name": "hotspot",
                "tags": "Standard",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-hotspot.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Artboard-4" sketch:type="MSArtboardGroup" fill="#019281"><rect id="Rectangle-32" fill-opacity="0.400000006" sketch:type="MSShapeGroup" x="2" y="2" width="26" height="26" rx="4"></rect><path d="M14.406079,7 L19.3938968,7 L15.0462468,13.8583375 L20.5,13.8583373 L12.4175106,24.3948897 L15.4176795,16.9625774 L9.5,16.9625774 L14.406079,7 Z" id="Path-696-Copy" sketch:type="MSShapeGroup"></path></g></svg>',
                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "rgba(78, 202, 186, 0.5)",
                    "text": "transparent",
                    "border": "transparent"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "",
                    "size": "12px",
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 75
                }
            }],
            "pinned": true

        }, {
            "groupname": "Flowchart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true

        }, {
            "groupname": "Containers",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true

        }, {
            "groupname": "Shapes",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true

        }, {
            "groupname": "Android Mockups",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
            "pinned": false
        }, {
            "groupname": "Entity Relationship",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Entity Relationship",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Entity Relationship",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Entity Relationship",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Entity Relationship",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Entity Relationship",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }],
            "pinned": false

        }, {
            "groupname": "iOS Mockups",
            "shapes": [{
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
            "pinned": false
        }, {
            "groupname": "Site Maps",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }],
            "pinned": false
        }, {
            "groupname": "UI Mockups",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "groupname": "UML",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "groupname": "BPMN 2.0",
            "shapes": [{
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Data Flow",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Org Charts",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Tables",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Value Stream",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "AWS Architecture",
            "shapes": [{
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Azure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Cisco Network Icons",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Network Infrastructure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Server Rack Diagrams",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Tech Clipart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "User Images",
            "shapes": [{
                "name": "Rectangle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Circuit Diagrams",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Enterprise Integration",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Equations",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Floor Plans",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Mind Mapping",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Process Engineering",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "groupname": "Venn Diagrams",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }];
        return lucidShapes;
    });

angular.module("lucidSlides", ['appConfig'])
    .directive('lucidSlides', function(config) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: config.componentsURL + 'slides/lucid-slides.html',
            controller: function($scope) {
                $scope.lucidSlides = [{
                    "x": 368,
                    "y": 100,
                    "height": 120,
                    "width": 160
                }, {
                    "x": 60,
                    "y": 210,
                    "height": 300,
                    "width": 400
                }, {
                    "x": 480,
                    "y": 300,
                    "height": 300,
                    "width": 400
                }];

            }
        };
    });

angular.module("lucidChartBlock", ['appConfig'])
    .directive('lucidChartBlock', function(config, $document, shapesData) {
        return {
            restrict: 'E',
            scope: {
                block: '=',
                selected: '=',
                addsavedstyle: '=',
                showcomments: '=',
                currenttheme: '=',
                contextmenu: '='
            },
            replace: true,
            templateUrl: config.componentsURL + 'chart-block/lucid-chart-block.html',
            controller: function($scope) {
                $scope.shapegroups = shapesData;
                $scope.saveShape = function(data, shapegroup) {

                    //var newblock = JSON.parse(JSON.stringify(selected));
                    //console.log(selected, shapegroup);
                    //$scope.shapegroups.shapegroup.shapes.push(newblock);

                    //var index = $scope.shapegroups.shapegroup.indexOf(data);
                    //console.log(index);
                    var newblock = JSON.parse(JSON.stringify(data));

                    newblock.shapepanel = true;
                    newblock.customcolor = true;
                    newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
                    shapegroup.shapes.push(newblock);
                    //console.log("shape saved to shapegroup", newblock);
                };

                $scope.showcontextMenu = false;
                $scope.showcontextMenuPosition = function(block) {
                    function getPosition(e) {
                        var posx = 0;
                        var posy = 0;

                        if (!e) {
                            var e = window.event;
                        }

                        if (e.pageX || e.pageY) {
                            posx = e.pageX;
                            posy = e.pageY;
                        } else if (e.clientX || e.clientY) {
                            posx = e.clientX + document.body.scrollLeft +
                                document.documentElement.scrollLeft;
                            posy = e.clientY + document.body.scrollTop +
                                document.documentElement.scrollTop;
                        }
                        //console.log(posx, posy)
                        return {
                            x: posx,
                            y: posy
                        };
                    }
                    if ($scope.selected === block) {
                        $scope.showcontextMenu = true;
                        var menuPosition = getPosition();
                        $scope.contextMenu = {};
                        $scope.contextMenu.left = menuPosition.x;
                        $scope.contextMenu.top = menuPosition.y;
                        // console.log($scope.contextMenu);
                    }
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

            },
            link: function(scope, el) {
                el.bind("keydown keypress", function(event) {
                    if (event.which === 13) {
                        scope.edittext = false;
                        event.preventDefault();
                    }
                });
                el.bind('mousedown', function() {
                    //e.stopPropagation();
                    //console.log(e);
                    //scope.selected = scope.block;
                    scope.$root.selectedBlock = scope.block;
                    console.log(scope.block);
                    //scope.$root.changealignment(scope.block.text.verticalalignment, scope.block.text.horizontalalignment);
                    scope.edittext = false;
                });
                el.bind('contextmenu', function() {
                    scope.showcontextMenu = true;
                    scope.edittext = false;
                });
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showcontextMenu = false;
                        scope.edittext = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
                $document.on('contextmenu', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showcontextMenu = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    });

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

