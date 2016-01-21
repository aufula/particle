/*global angular : true fixes codekit error*/
/*global console : true fixes codekit error*/

angular.module('particleApp', ['lucidComponents'])
    ////////////////
    ////START MAIN CTRL
    ////////////////
    .controller('mainCtrl', function($scope, $rootScope, docTemplates) {

        $scope.pressTemplates = docTemplates;
        $scope.newDocument = true;
        $scope.createDocument = function(category){
            var baseURL = 'http://corys-macbook-pro-2.local:5757/prototype/press/latest/#'
            window.location.href = baseURL + category.category;
            console.log(category);
        };

    })
    ///
    .factory('docTemplates', [function() {
        var docTemplates = [{
            "category": "Blank",
            "size": "Custom Size",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-placeholder-blank-page.png"
        }, {
            "category": "Flyer",
            "size": "8.5 x 11 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-1.png"
        }, {
            "category": "Brochure",
            "size": "11 x 8.5 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-1.png"
        }, {
            "category": "Card",
            "size": "6 x 4 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-postcard-template-1.png"
        }, {
            "category": "Poster",
            "size": "18 x 24 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-1.png"
        }, {
            "category": "Report",
            "size": "8.5 x 11 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-annual-report-template-1.png"
        }, {
            "category": "Business Card",
            "size": "3.5 x 2 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-1.png"
        }, {
            "category": "Social Media",
            "size": "3.667 x 8.5 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-leaflet-template-1.png"
        }];
        return docTemplates;
    }]);