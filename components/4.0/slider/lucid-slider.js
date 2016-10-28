angular.module('lucidSlider', ['appConfig'])
    .directive('lucidSlider', ['config', function(config) {
        return {
            restrict: 'AE',
            scope: {
                slider: '=?ngModel',
                width:'@',
                label: '@',
                min:'@',
                max:'@',
                unit:'@',
                step: '@'
            },
            replace: true,
            templateUrl: config.componentsURL + 'slider/lucid-slider.html',
            compile: function(el, attrs) {
                if (!attrs.step) {
                    attrs.step = 1;
                }
                if (!attrs.unit) {
                    attrs.unit = "";
                }
                if (!attrs.slider) {
                    attrs.slider = "0";
                }
            }
        };
    }]);