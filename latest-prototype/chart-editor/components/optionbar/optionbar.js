angular.module('optionbar', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    ////////////////
    ////START LINE PATH CTRL -> these are here to create smooth transitions between button states.
    ////////////////
    .controller('linePathCtrl', function($scope, $timeout) {

        // angular.element(document).ready(function() {
        //     $scope.lucidPath = new SVGMorpheus('#lucid-path-style');
        // });

        $timeout(function() {
            $scope.lucidPath = new SVGMorpheus('#lucid-path-style');
        }, 1400);

        $scope.changePath = function(path) {
            if (path === 'straight') {
                $scope.lucidPath.to('lucid-straight-path', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (path === 'curved') {
                $scope.lucidPath.to('lucid-curve-path', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (path === 'angle') {
                $scope.lucidPath.to('lucid-angle-path', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            $scope.showpopover = false;
        };

    })
    ////////////////
    ////START TEXT ALIGNMENT CTRL
    ////////////////
    .controller('textAlignmentCtrl', function($scope, $timeout) {

        $timeout(function() {
            $scope.lucidPath = new SVGMorpheus('#lucid-text-align');
        }, 1400);

        // angular.element(document).ready(function() {
        //     $scope.lucidPath = new SVGMorpheus('#lucid-text-align');
        // });
        //set default state if no object is selected
        if (!$scope.selected) {
            $scope.selected = {};
            $scope.selected.text = {
                "verticalalignment": "middle",
                "horizontalalignment": "center"
            };
        }

        $scope.changeAlignment = function(vertical, horizontal) {
            $scope.selected.text.verticalalignment = vertical;
            $scope.selected.text.horizontalalignment = horizontal;
            if (vertical === 'top' && horizontal === 'left') {
                $scope.lucidPath.to('lucid-text-top-left', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });

            }
            if (vertical === 'top' && horizontal === 'center') {
                $scope.lucidPath.to('lucid-text-top-center', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'top' && horizontal === 'right') {
                $scope.lucidPath.to('lucid-text-top-right', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            //middle
            if (vertical === 'middle' && horizontal === 'left') {
                $scope.lucidPath.to('lucid-text-middle-left', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'middle' && horizontal === 'center') {
                $scope.lucidPath.to('lucid-text-middle-center', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'middle' && horizontal === 'right') {
                $scope.lucidPath.to('lucid-text-middle-right', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }

            //bottom

            if (vertical === 'bottom' && horizontal === 'left') {
                $scope.lucidPath.to('lucid-text-bottom-left', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'bottom' && horizontal === 'center') {
                $scope.lucidPath.to('lucid-text-bottom-center', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'bottom' && horizontal === 'right') {
                $scope.lucidPath.to('lucid-text-bottom-right', {
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
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-top-left-22px.svg",
        }, {
            "verticalalignment": "top",
            "horizontalalignment": "center",
            "name": "top-center",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-top-center-22px.svg",
        }, {
            "verticalalignment": "top",
            "horizontalalignment": "right",
            "name": "top-right",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-top-right-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "left",
            "name": "center-left",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-center-left-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "center",
            "name": "center-center",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-center-center-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "right",
            "name": "center-right",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-center-right-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "left",
            "name": "bottom-left",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-bottom-left-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "center",
            "name": "bottom-center",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-bottom-center-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "right",
            "name": "bottom-right",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-bottom-right-22px.svg",
        }];
    });