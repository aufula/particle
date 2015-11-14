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
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });

                    }
                    if (vertical === 'top' && horizontal === 'center') {
                        lucidPath.to('lucid-text-top-center', {
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'top' && horizontal === 'right') {
                        lucidPath.to('lucid-text-top-right', {
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    //middle
                    if (vertical === 'middle' && horizontal === 'left') {
                        lucidPath.to('lucid-text-middle-left', {
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'middle' && horizontal === 'center') {
                        lucidPath.to('lucid-text-middle-center', {
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'middle' && horizontal === 'right') {
                        lucidPath.to('lucid-text-middle-right', {
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }

                    //bottom

                    if (vertical === 'bottom' && horizontal === 'left') {
                        lucidPath.to('lucid-text-bottom-left', {
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'bottom' && horizontal === 'center') {
                        lucidPath.to('lucid-text-bottom-center', {
                            duration: 400,
                            easing: 'quad-out',
                            rotation: 'none'
                        });
                    }
                    if (vertical === 'bottom' && horizontal === 'right') {
                        lucidPath.to('lucid-text-bottom-right', {
                            duration: 400,
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