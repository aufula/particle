/*global angular : true fixes codekit error*/
angular.module("lucidColorPicker", ['appConfig'])
    .directive('lucidColorPicker', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '=',
            },
            replace: false,
            templateUrl: config.componentsURL + 'color-picker/lucid-color-picker.html',

            controller: ['$scope', function($scope) {
                $scope.swatchpanel = 'Fill';
                $scope.showColorDrawer = false;
            }]
        };
    }])
    .directive('lucidColorPickerOptions', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                color: '=',
            },
            templateUrl: config.componentsURL + 'color-picker/lucid-color-picker-options.html',
            controller: ['$scope', function($scope) {
                $scope.lucidcolorpickergrayscale = [{
                    "hex": "#ffffff",
                }, {
                    "hex": "EAEAEA",
                }, {
                    "hex": "D9D9D9",
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

            }]
        };
    }]);