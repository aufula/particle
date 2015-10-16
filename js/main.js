/*global angular : true fixes codekit error*/
var particleApp = angular.module('particleApp', ['ngRoute', 'lucidComponentFactory', 'ngAnimate', 'lucidComponents', 'hljs', 'lucidIcons', 'lucidSnippets']);

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
            controller: 'componentController'
        })
        .when('/icons', {
            templateUrl: 'templates/icons.html',
            controller: 'mainController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

particleApp.controller('mainController', function($scope, $location, lucidComponentFactory, lucidIconFactory) {

    //this function adds active class to sidebar items//
    $scope.isActive = function(viewRoot, viewEnd) {
        var viewLocation = viewRoot + viewEnd;
        var active = (viewLocation === $location.url());
        return active;

    };
    $scope.icons = lucidIconFactory;

    //this pulls in the component groups for the sidebar//
    $scope.componentGroups = lucidComponentFactory;

});
particleApp.controller('componentController', function($scope, lucidComponentFactory, $routeParams, $filter) {
    //gets component id from URL
    $scope.componentGroupID = $routeParams.componentGroupID;

    $scope.components = $filter('filter')(lucidComponentFactory, {
        "groupid": $routeParams.componentGroupID
    });

});

particleApp.controller('angularController', function($scope, $sce, lucidSnippets) {
    $scope.getIframeSrc = function(codepen) {
        return $sce.trustAsResourceUrl(codepen);
    };
    $scope.snippets = lucidSnippets;

});