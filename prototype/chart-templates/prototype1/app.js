/*global angular : true fixes codekit error*/
/*global console : true fixes codekit error*/

angular.module('particleApp', ['lucidComponents'])
    ////////////////
    ////START MAIN CTRL
    ////////////////
    .controller('mainCtrl', function($scope) {


     ////New document button that takes you into editor

        $scope.createDocument = function(){
            window.location = "editor/index.html";
        };

    })
