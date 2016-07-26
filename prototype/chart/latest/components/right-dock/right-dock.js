angular.module('rightDock', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    .controller('RightDockCtrl', function($scope, $rootScope) {
        $scope.openTab = "";
        $scope.showTooltipPresent = true;
        $scope.showTooltipHistory = true;

        $rootScope.setTab = function(name) {

            if (name === $scope.openTab) { // is the tab already open?
                $scope.openTab = ""; // then empty the var
            } else {
                $scope.openTab = name; // set the tab
            }

            if ($scope.openTab === "comments") { // Turn on frames and comments
                $rootScope.showComments = true;
                $rootScope.showSlides = false;
            } else if ($scope.openTab === "present") {
                $rootScope.showSlides = true;
                $rootScope.showComments = false;
            } else {
                $rootScope.showComments = false;
                $rootScope.showSlides = false;
            }

            if ($scope.openTab === "") { // hide panel if no tab selected
                $scope.rightDock = false;
            } else { // show panel
                $scope.rightDock = true;
            }
        };
    })
    ////////////////
    ////START SHARE CTRL
    ////////////////
    .controller('ShareCtrl', function($scope, $rootScope, $timeout) {
        $scope.dummyData = { // empty form data
            name: "",
            role: "Editor"
        };
        $scope.focusCollaborator = function() {
            var elementID = 'add-collaborator-input';
            $timeout(function() {
                document.getElementById(elementID).getElementsByTagName('input')[0].focus();
            }, 10);
        };
        $scope.addPerson = function(data) {
            $rootScope.saveDocument();
            var collaborator = {
                'name': data.name,
                'role': data.role,
                'svg': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-share-person-white.svg'
            }
            if (data.name === 'matt') {
                collaborator.name = 'Matt Snyder';
                collaborator.image = 'https://avatars.slack-edge.com/2014-12-02/3129295960_063bde45974958efcc01_192.jpg';
                collaborator.svg = null;
            }
            if (data.name === 'cory') {
                collaborator.name = 'Cory McArthur';
                collaborator.image = 'https://avatars.slack-edge.com/2015-06-10/6217971094_fded55591147999b3f1f_192.jpg';
                collaborator.svg = null;
            }
            if (data.name === 'matthew') {
                collaborator.name = 'Matthew O\'Rourke';
                collaborator.image = 'https://avatars.slack-edge.com/2015-01-07/3355887951_3bc33899538ea9866829_192.jpg';
                collaborator.svg = null;
            }
            if (data.name === 'taylor') {
                collaborator.name = 'Taylor Palmer'
                collaborator.image = 'https://avatars.slack-edge.com/2015-11-12/14463452164_03d711e152d13a4957e8_192.jpg';
                collaborator.svg = null;
            }
            if (data.name === 'rob') {
                collaborator.name = 'Rob Witt';
                collaborator.image = 'https://avatars.slack-edge.com/2014-11-24/3076026439_03deaeac3a91313f3903_192.jpg';
                collaborator.svg = null;
            }
            if (data.name === 'Marketing' || data.name === 'Team' || data.name === 'group') {
                collaborator.svg = 'http://particle.golucid.co/components/1.2/icon/icons/icon-team-22px.svg';
            }
            $scope.collaborators.push(collaborator);
            $scope.dummyData = {
                name: "",
                role: "Editor"
            }; // reset the form data
            $scope.showing = false;
            return


            $scope.collaborators.push(data); // add the data
            $scope.dummyData = {
                name: "",
                role: "Editor"
            }; // reset the form data
            $scope.showing = false;
        };


        $scope.collaborators = [{ // Fake data (feel free to change)
            name: "Ryan Contreras",
            role: "Editor",
            image: "https://s3.amazonaws.com/uifaces/faces/twitter/zack415/128.jpg"
        }, {
            name: "Dave Smith",
            role: "Commenter",
            image: "https://s3.amazonaws.com/uifaces/faces/twitter/marcosmoralez/128.jpg"
        }];
    })