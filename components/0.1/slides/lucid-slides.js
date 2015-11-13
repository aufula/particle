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