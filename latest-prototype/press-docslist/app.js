/*global angular*/

angular.module('particleApp', ['lucidComponents'])

.controller('mainCtrl', function($scope) {

    $scope.documents = [{
        "name": "Brocure 06",
        "url": "#",
        "img": "files/brochure.png"
    }, {
        "name": "Business Card",
        "url": "#",
        "img": "files/businesscard.png"
    }];
    $scope.goTo = function(url){
        window.location.href = url;
    };
});