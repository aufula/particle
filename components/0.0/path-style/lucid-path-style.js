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
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (path === 'curved') {
                        lucidPath.to('lucid-curve-path', {
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (path === 'angle') {
                        lucidPath.to('lucid-angle-path', {
                            duration: 400,
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