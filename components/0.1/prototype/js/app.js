angular.module('particleApp', ['lucidComponents'])

.controller('ShareCtrl', function($scope) {

  $scope.showPopup = function() {
    $scope.showing = true;
    $scope.dummyData = {
      name: "",
      role: "Editor"
    };
  };
  
  $scope.addPerson = function(item) {
    $scope.collaborators.push(item);
    $scope.showing = false;
    $scope.dummyData = {};
  };
  
  $scope.collaborators = [{
    name: "Taylor Palmer",
    role: "Owner",
    image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/taylor-palmer-bw_(1).jpg"
  }, {
    name: "Juanito Bandito",
    role: "Commenter",
    image: "https://pbs.twimg.com/profile_images/2330184296/4qz45r6cd59i3lnmbaw4.jpeg"
  }];
})

.controller('RightDockCtrl', function($scope) {
	$scope.openTab = "";

	$scope.setTab = function(name) {

		if (name === $scope.openTab) { // is the tab already open?
			$scope.openTab = "";      // then empty the var
		} else {
			$scope.openTab = name;    // set the tab
		}

		if ($scope.openTab === "comments") { // Turn on frames and comments
			$scope.showComments = true;
		} else if ($scope.openTab === "present") {
			$scope.showSlides = true;
		} else {
			$scope.showComments = false;
			$scope.showSlides = false;
		}

		if ($scope.openTab === "") { // hide panel if no tab selected
			$scope.rightDock = false;
		} else {                     // show panel
 			$scope.rightDock = true;
		}

		
	};
});