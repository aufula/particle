/*global angular : true fixes codekit error*/
var particleApp = angular.module('particleApp', ['appConfig', 'ngRoute', 'lucidComponentFactory', 'ngAnimate', 'lucidComponents', 'hljs', 'lucidIcons', 'lucidSnippets', 'lucidProductionFactory', 'lucidColors']);

particleApp.run(['$route', '$rootScope', '$location', function($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function(path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function() {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);
particleApp.config(function($routeProvider) {
    $routeProvider
        .when('/overview', {
            templateUrl: 'templates/landing-page.html',
        })
        .when('/codepen', {
            templateUrl: 'templates/codepen.html',
        })
        .when('/how-to', {
            templateUrl: 'templates/how-to.html',
        })
        .when('/angular', {
            templateUrl: 'templates/angular.html',
            controller: 'angularController'
        })
        .when('/components', {
            templateUrl: 'templates/components.html',
            controller: 'componentController'
        })
        .when('/components/:componentGroupID', {
            templateUrl: 'templates/components.html',
            controller: 'componentController',
            reloadOnSearch: false
        })
        .when('/components/:componentGroupID/:searchResults', {
            templateUrl: 'templates/components.html',
            controller: 'componentController'
        })
        .when('/icons', {
            templateUrl: 'templates/icons.html',
            controller: 'iconController',
            reloadOnSearch: false
        })
        .when('/icons/:searchResults', {
            templateUrl: 'templates/icons.html',
            controller: 'iconController',
            reloadOnSearch: false
        })
        .when('/production', {
            templateUrl: 'templates/production-components.html',
            controller: 'productionController',
            reloadOnSearch: false
        })
        .when('/production/:searchResults', {
            templateUrl: 'templates/production-components.html',
            controller: 'productionController',
            reloadOnSearch: false
        })
        .when('/colors', {
            templateUrl: 'templates/colors.html',
            controller: 'colorController',
            reloadOnSearch: false
        })
        .when('/colors/:searchResults', {
            templateUrl: 'templates/colors.html',
            controller: 'colorController',
            reloadOnSearch: false
        })

    .otherwise({
        redirectTo: '/overview'
    });
});

particleApp.controller('mainController', function($scope, $location, lucidComponentFactory) {

    //this function adds active class to sidebar items//
    $scope.isActive = function(viewRoot, viewEnd) {
        var viewLocation = viewRoot + viewEnd;
        var active = ($location.url().indexOf(viewLocation) > -1);
        return active;
    };

    //this pulls in the component groups for the sidebar//
    $scope.componentGroups = lucidComponentFactory;
    //this adds URLs to the side bar for prototypes
    $scope.prototypes = [{
        'title': 'Chart Editor',
        'url': 'latest-prototype/chart-editor'
    }, {
        'title': 'Press Editor',
        'url': 'latest-prototype/press-editor'
    }, {
        'title': 'Press Docs List',
        'url': 'latest-prototype/press-docslist'
    }];

});
particleApp.controller('iconController', function(config, $scope, lucidIconFactory, $routeParams, $location) {

    $scope.icongroups = lucidIconFactory;


    $scope.$watch('searchResults', function(newValue) {
        if (newValue) {
            var newPath = '/icons/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath')
        }
    });

    angular.forEach($scope.icongroups, function(icongroup) {
        angular.forEach(icongroup.icons, function(icon) {
            icon.url = config.componentsURL + 'icons/svg/' + icon.name + '.svg';
        });
    });

    $scope.searchResults = $routeParams.searchResults;

});

particleApp.controller('componentController', function($scope, config, lucidComponentFactory, $routeParams, $filter, $location) {
    //gets component id from URL
    $scope.componentGroupID = $routeParams.componentGroupID;

    $scope.components = $filter('filter')(lucidComponentFactory, {
        "groupid": $routeParams.componentGroupID
    });
    $scope.componentPath = config.componentsURL; //

    $scope.searchResults = $routeParams.searchResults;

    $scope.$watch('searchResults', function(newValue) {
        if (newValue) {
            var newPath = '/components/' + $scope.componentGroupID + '/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath', newPath)
        }

    });
});

particleApp.controller('angularController', function($scope, $sce, lucidSnippets) {
    $scope.getIframeSrc = function(codepen) {
        return $sce.trustAsResourceUrl(codepen);
    };
    $scope.snippets = lucidSnippets;

});

particleApp.controller('productionController', function($scope, lucidProductionFactory, $routeParams, $filter, $location) {

    $scope.productionComponents = lucidProductionFactory;

    $scope.searchResults = $routeParams.searchResults;

    $scope.$watch('searchResults', function(newValue) {
        if (newValue) {
            var newPath = '/production/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath', newPath)
        }

    });
    //button function for alerts direct to URL

    $scope.openURL = function(url) {
        var win = window.open(url, '_blank');
        win.focus();
    };

});
particleApp.controller('colorController', function($scope, lucidColorFactory, $routeParams, $filter, $location) {

    $scope.colors = lucidColorFactory;
    $scope.searchResults = $routeParams.searchResults;

    $scope.$watch('searchResults', function(newValue) {
        if (newValue) {
            var newPath = '/colors/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath', newPath)
        }

    });


});
particleApp.controller('colorCtrl', function($scope, $timeout) {

    $scope.copyItem = function(item) {
        $scope.copied = item;
        $timeout(function() {
            $scope.copied = null;
        }, 750);
    };


});
//////// directives ////////
particleApp.directive("landingPage", function($animate, $timeout) {
    return function(scope, element, attrs) {
        $timeout(function() {
            $animate.addClass(element, "loaded");
            //console.log('loaded');
        }, 10);

        scope.$watch(attrs.landingPage, function(newVal) {
            if (newVal) {
                $animate.addClass(element, "landing-page");
            } else {
                $animate.removeClass(element, "landing-page");
            }
        });
    };
});
particleApp.directive('collapse', ['$timeout', function($timeout) {
    return {
        restrict: 'A',

        link: function($scope, ngElement, attributes) {
            var element = ngElement[0];

            $scope.$watch(attributes.collapse, function(collapse) {

                $timeout(function() {
                    var newHeight = collapse ? 0 : getElementAutoHeight();
                    //console.log("new Height", newHeight);

                    element.style.height = newHeight + 'px';
                    ngElement.toggleClass('collapsed', collapse);
                }, 10);
            });

            function getElementAutoHeight() {
                var currentHeight = getElementCurrentHeight();

                element.style.height = 'auto';
                var autoHeight = getElementCurrentHeight();

                element.style.height = currentHeight;
                getElementCurrentHeight(); // Force the browser to recalc height after moving it back to normal

                return autoHeight;
            }

            function getElementCurrentHeight() {
                return element.offsetHeight;
            }
            $scope.updateHeight = function() {
                $timeout(function() {
                    var newHeight = getElementAutoHeight();
                    //console.log("update Height", newHeight);

                    element.style.height = newHeight + 'px';

                }, 1);
            };
        }
    };
}]);
particleApp.directive('clipboard', ['$document', function($document) {
    return {
        restrict: 'A',
        scope: {
            onCopied: '&',
            onError: '&',
            text: '='
        },
        link: function(scope, element) {
            function createNode(text) {
                var node = $document[0].createElement('textarea');
                node.style.position = 'absolute';
                node.style.left = '-10000px';
                node.textContent = text;
                return node;
            }

            function copyNode(node) {
                // Set inline style to override css styles
                $document[0].body.style.webkitUserSelect = 'initial';

                var selection = $document[0].getSelection();
                selection.removeAllRanges();
                node.select();

                if (!$document[0].execCommand('copy')) {
                    throw ('failure copy');
                }
                selection.removeAllRanges();

                // Reset inline style
                $document[0].body.style.webkitUserSelect = '';
            }

            function copyText(text) {
                var node = createNode(text);
                $document[0].body.appendChild(node);
                copyNode(node);
                $document[0].body.removeChild(node);
            }

            element.on('click', function() {
                try {
                    copyText(scope.text);
                    if (angular.isFunction(scope.onCopied)) {
                        scope.$evalAsync(scope.onCopied());
                    }
                } catch (err) {
                    if (angular.isFunction(scope.onError)) {
                        scope.$evalAsync(scope.onError({
                            err: err
                        }));
                    }
                }
            });
        }
    };
}]);