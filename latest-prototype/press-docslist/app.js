/*global angular : true fixes codekit error*/
/*global console : true fixes codekit error*/

angular.module('particleApp', ['lucidComponents'])
    ////////////////
    ////START MAIN CTRL
    ////////////////
    .controller('mainCtrl', function($scope, $rootScope, docTemplates, pressTemplates) {

        $scope.pressStarters = docTemplates;
        $scope.pressTemplates = pressTemplates;
        $scope.newDocument = true;
        $scope.createDocument = function(group){
            var baseURL = '/prototype/press/latest/#';
            window.location.href = baseURL + group.groupname;
            console.log(group);
        };

    })
    ///
    .factory('docTemplates', [function() {
        var docTemplates = [{
            "groupname": "Blank",
            "size": "Custom Size",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-placeholder-blank-page.png"
        }, {
            "groupname": "Flyer",
            "size": "8.5 x 11 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-flyer-template-1.png"
        }, {
            "groupname": "Brochure",
            "size": "11 x 8.5 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-brochure-template-1.png"
        }, {
            "groupname": "Card",
            "size": "6 x 4 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-postcard-template-1.png"
        }, {
            "groupname": "Poster",
            "size": "18 x 24 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-poster-template-1.png"
        }, {
            "groupname": "Report",
            "size": "8.5 x 11 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-annual-report-template-1.png"
        }, {
            "groupname": "Business Card",
            "size": "3.5 x 2 in",
            "url": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/press-business-card-template-1.png"
        }];
        return docTemplates;
    }]);