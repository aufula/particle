/*global angular : true fixes codekit error*/
var particleApp = angular.module('particleApp', ['ngRoute', 'lucidComponentFactory', 'ngAnimate', 'lucidComponents', 'hljs', 'lucidIcons']);

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

particleApp.controller('angularController', function($scope, $sce) {
    $scope.getIframeSrc = function(codepen) {
        return $sce.trustAsResourceUrl(codepen);
    };
    $scope.snippets = [{
            'title': 'Show Panels: ng-click',
            'codepen': 'http://codepen.io/corysmc/embed/ZbXeMq/?height=350&theme-id=19963&default-tab=result',
            'description': 'The easiest way to add an interaction is by assigning a variable when someone clicks on an element. This can be done using "ng-click." In the demo below we set the variable {{hideleft}}  and {{hideright}} to true or false.'
        }, {
            'title': 'Show Panels: ng-hide',
            'codepen': 'http://codepen.io/corysmc/embed/GpMWXj/?height=350&theme-id=19963&default-tab=result',
            'description': 'We can now easily hide the panels by adding ng-hide to the elements we want to hide. When ng-hide is true, angular will hide the element. Because our variables are not set, the elements will show by default.'
        }, {
            'title': 'Show Panels: ng-animate',
            'codepen': 'http://codepen.io/corysmc/embed/PPJbGE/?height=350&theme-id=19963&default-tab=result',
            'description': 'We have elements showing and hiding, angular makes it very easy to add a transition when you show and hide an element. In our css we need to add .ng-hide and .ng-animate to the element we are hiding. See code below for examples.'
        }, {
            'title': 'Show Panels: ng-class',
            'codepen': 'http://codepen.io/corysmc/embed/RWLpeR/?height=350&theme-id=19963&default-tab=result',
            'description': 'Great! We have transitions for our sliding panels, but our show/hide toggle needs to show which toggle is currently active. We can do this using ng-class. First put the class you want to add, then put the condition that must be true for the class to be added. See code for example.'
        }, {
            'title': 'Select Dropdown: ng-click',
            'codepen': 'http://codepen.io/corysmc/embed/avyYpE/?height=350&theme-id=19963&default-tab=result',
            'description': 'The easiest way to add an interaction is by assigning a variable when someone clicks on an element. This can be done using "ng-click." In the demo below we set the variable {{selectedFont}} to the font that is clicked. Note: We also use ng-init to assign an inital state to the variable {{selectedFont}}.'
        }, {
            'title': 'Select Dropdown: ng-show',
            'codepen': 'http://codepen.io/corysmc/embed/JYyLyv/?height=350&theme-id=19963&default-tab=result',
            'description': 'If we want to show/hide an element on the page we use ng-show. ng-show will show an element if the assigned value is true, and it will hide the block if it\'s value is false. (the opposite is true with ng-hide). Using ng-click we can assign this variable when a user clicks another element. The "!" means \'not\' in code, this allows us to toggle between true and false (show and hide).'
        }, {
            'title': 'Select Dropdown: ng-class',
            'codepen': 'http://codepen.io/corysmc/embed/meMxBY/?height=350&theme-id=19963&default-tab=result',
            'description': 'In our dropdown example we want to show which font is selected. We can do that by adding a class to the current {{selectedFont}}. Using ng-class we can add a class dependent on our {{selectedFont}} variable. '
        }, {
            'title': 'Select Dropdown: ng-repeat',
            'codepen': 'http://codepen.io/corysmc/embed/vNJRWP/?height=350&theme-id=19963&default-tab=result',
            'description': 'You\'ll notice we have a lot of repeated html and angular expressions in our examples above. Anytime you are repeating html ask yourself if ng-repeat can be used. This makes it very easy to add a font to our list without having to recode anything. NOTE: when using ng-repeat in order to assign a avariable outside the repeat you need to use $parent.selectedFont.'
        }
    ];

});