/*global angular : true fixes codekit error*/
angular.module("lucidColorPicker", ['appConfig'])
    .directive('lucidColorPicker', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                selected: '=?',
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
                    "hex": "#FFFFFF",
                }, {
                    "hex": "#E5E5E5",
                }, {
                    "hex": "#CCCCCC",
                }, {
                    "hex": "#B2B2B2",
                }, {
                    "hex": "#999999",
                }, {
                    "hex": "#666666",
                }, {
                    "hex": "#333333",
                }, {
                    "hex": "#000000",
                }];
                $scope.lucidcolorpickercolors = [{
                    "hex": "#d1bcd2"
                }, {
                    "hex": "#f9d2de"
                }, {
                    "hex": "#ffbbb1"
                }, {
                    "hex": "#ffdba9"
                }, {
                    "hex": "#ffeca9"
                }, {
                    "hex": "#c7e8ac"
                }, {
                    "hex": "#99d5ca"
                }, {
                    "hex": "#c1e4f7"
                }, {
                    "hex": "#b2d6ef"
                }, {
                    "hex": "#b391b5"
                }, {
                    "hex": "#f5b5c8"
                }, {
                    "hex": "#ff8f80"
                }, {
                    "hex": "#ffc374"
                }, {
                    "hex": "#ffdf71"
                }, {
                    "hex": "#a3d977"
                }, {
                    "hex": "#5abaa7"
                }, {
                    "hex": "#99d2f2"
                }, {
                    "hex": "#83bbe5"
                }, {
                    "hex": "#834187"
                }, {
                    "hex": "#de5f85"
                }, {
                    "hex": "#c92d39"
                }, {
                    "hex": "#ef8d22"
                }, {
                    "hex": "#fcc438"
                }, {
                    "hex": "#7ab648"
                }, {
                    "hex": "#19967d"
                }, {
                    "hex": "#3aa6dd"
                }, {
                    "hex": "#0c7cba"
                }];

            }]
        };
    }]);