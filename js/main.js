/*global angular : true fixes codekit error*/
var particleApp = angular.module('particleApp', ['ngRoute', 'lucidComponentFactory', 'ngAnimate', 'lucidComponents', 'hljs', 'lucidIcons', 'lucidSnippets']);
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
        .when('/', {
            templateUrl: 'templates/welcome.html',
        })
        .when('/get-started', {
            templateUrl: 'templates/getstarted.html',
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
        .otherwise({
            redirectTo: '/'
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

});
particleApp.controller('iconController', function($scope, lucidIconFactory, $routeParams, $location) {

    $scope.icons = lucidIconFactory;


    $scope.$watch('searchResults', function(newValue) {
        if (newValue != null) {
            var newPath = '/icons/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath')
        }
    });

    angular.forEach($scope.icons, function(icon) {
        icon.url = ' http://particle.golucid.co/components/0.0/icon/img/' + icon.name + '.svg';
    });

    $scope.searchResults = $routeParams.searchResults;

});

particleApp.controller('componentController', function($scope, lucidComponentFactory, $routeParams, $filter, $location) {
    //gets component id from URL
    $scope.componentGroupID = $routeParams.componentGroupID;

    $scope.components = $filter('filter')(lucidComponentFactory, {
        "groupid": $routeParams.componentGroupID
    });
    $scope.componentPath = "components/1.1/";

    $scope.searchResults = $routeParams.searchResults;

    $scope.$watch('searchResults', function(newValue) {
        if (newValue != null) {
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

//////// directives ////////
particleApp.directive('collapse', ['$timeout', '$animateCss', function($timeout, $animateCss) {
    return {
        restrict: 'A',

        link: function($scope, ngElement, attributes) {
            var element = ngElement[0];

            $scope.$watch(attributes.collapse, function(collapse) {

                $timeout(function() {
                    var newHeight = collapse ? 0 : getElementAutoHeight();
                    console.log("new Height", newHeight);

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
                return element.offsetHeight
            }
            $scope.updateHeight = function() {
                $timeout(function() {
                    var newHeight = getElementAutoHeight();
                    console.log("update Height", newHeight);

                    element.style.height = newHeight + 'px';

                }, 1);
            }
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

            element.on('click', function(event) {
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