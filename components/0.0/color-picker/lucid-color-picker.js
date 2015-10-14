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