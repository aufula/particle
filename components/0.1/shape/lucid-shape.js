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
            controller: function($scope){
                $scope.componentsURL = config.componentsURL;
            },
            compile: function(element, attrs) {

                if (!attrs.shape || attrs.shape === "" || attrs.shape === null) {
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