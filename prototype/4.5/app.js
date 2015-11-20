/*global angular : true fixes codekit error*/
/*global console : true fixes codekit error*/

angular.module('particleApp', ['lucidComponents'])

.controller('ShareCtrl', function($scope) {

  $scope.showPopup = function() {
    $scope.showing = true; // show popup
    $scope.dummyData = { // empty form data
      name: "",
      role: "Editor"
    };
  };

  $scope.addPerson = function(item) {
    $scope.collaborators.push(item); // add the data
    $scope.showing = false; // hide the popup
    $scope.dummyData = {}; // reset the form data
  };

  $scope.collaborators = [{ // Fake data (feel free to change)
    name: "Ryan Contreras",
    role: "Owner",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/zack415/128.jpg"
  }, {
    name: "Dave Smith",
    role: "Commenter",
    image: "https://s3.amazonaws.com/uifaces/faces/twitter/marcosmoralez/128.jpg"
  }];
})

.controller('RightDockCtrl', function($scope, $rootScope) {
    $scope.openTab = "";
    $scope.showTooltipPresent = true;
    $scope.showTooltipHistory = true;

    $scope.setTab = function(name) {

      if (name === $scope.openTab) { // is the tab already open?
        $scope.openTab = ""; // then empty the var
      } else {
        $scope.openTab = name; // set the tab
      }

      if ($scope.openTab === "comments") { // Turn on frames and comments
        $rootScope.showComments = true;
      } else if ($scope.openTab === "present") {
        $rootScope.showSlides = true;
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
  .controller('ShapesManagerCtrl', function($scope, $rootScope, shapesData, $document, $timeout) {
    /////start shapes manager
    $scope.shapegroups = shapesData.all();

    $scope.clickShapes = function() {
      if (!$scope.searchshapes) {
        $rootScope.manageshapes = !$rootScope.manageshapes;
      } else {
        $scope.searchshapes = false;
      }
    };

    $scope.newCustomGroup = function() {
      var newGroup = {
        "groupname": "New Group",
        "custom": true,
        "edit": true,
        "shapes": [{
          'fake': 'fake'
        }],
      };
      shapesData.addGroup(newGroup);
      //$scope.customshapes.splice(0, 0, newGroup);
    };
    $scope.editName = function(shapegroup, index) {
      shapegroup.edit = true;
      var elementID = 'name-input-' + index;
      $timeout(function() {
        document.getElementById(elementID).select();
      }, 10);
      shapegroup.edit = true;
    };

    $scope.pinnedCount = 5; //current loaded number of pinned libraries.

    $scope.pinGroup = function(shapegroup) {
      var group = shapesData.get(shapegroup.id);
      group.pinned = true;

      $scope.pinnedCount += 1; //always pin to bottom
      shapegroup.pinnedOrder = $scope.pinnedCount;
      //show message if not in display
      $scope.showPinMessage(shapegroup);
      console.log('pin');
    };
    $scope.unPinGroup = function(shapegroup) {
      var group = shapesData.get(shapegroup.id);
      group.pinned = false;
      console.log('unpin');
    };
    $scope.togglePin = function(shapegroup) {
      if (shapegroup.pinned) {
        $scope.unPinGroup(shapegroup);
      } else {
        $scope.pinGroup(shapegroup);
      }
    };
    $scope.showPinMessage = function(shapegroup) {
      //add message
      var overflow = document.getElementById('left-panel-shapes').offsetHeight < document.getElementById('left-panel-shapes-scroll').offsetHeight;
      //console.log('overflow: ', overflow)
      if (overflow) {
        $scope.overflowMessage = true;
        $scope.overflowMessageTitle = shapegroup.groupname;
        $timeout(function() {
          $scope.overflowMessage = false;
        }, 2000);
      }
    };
    $scope.openWindow = function(url) {
      window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
    };

    //from demo
    $scope.dragoverCallback = function(event, index, external, type) {
      $scope.logListEvent('dragged over', event, index, external, type);
      // Disallow dropping in the third row. Could also be done with dnd-disable-if.
      return index; // < 10;
    };

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
      $scope.logListEvent('dropped at', event, index, external, type);
      if (external) {
        //if (allowedType === 'itemType' && !item.label) return false;
        if (allowedType === 'containerType' && !angular.isArray(item)){

         return false;
         }
      }
      return item;
    };

    $scope.logEvent = function(message, event) {
      console.log(message, '(triggered by the following', event.type, 'event)');
      console.log(event);
    };

    $scope.logListEvent = function(action, event, index, external, type) {
      var message = external ? 'External ' : '';
      message += type + ' element is ' + action + ' position ' + index;
      $scope.logEvent(message, event);
    };
    ///// end shapes manager

  })
  .controller('ShapeGroupCtrl', function($scope) {
    $scope.onDropComplete = function(data) {
      //e.stopPropagation(); is there a way to stop this from happening on canvas? (shape manager)
      console.log('dropped');
      if (data) {
        var index = $scope.shapes.indexOf(data);
        //console.log('shape', index);

        if (index === -1) {
          //var index = $scope.shapegroups.shapegroup.indexOf(data);
          //console.log(index);
          var newblock = JSON.parse(JSON.stringify(data));

          newblock.shapepanel = true;
          newblock.customcolor = true;
          if (!newblock.url) {
            //this is here so that we can save any shape from the library for reuse.
            newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
          }
          $scope.shapes.push(newblock);
          //console.log("shape saved to shapegroup", newblock);
        }
      }
    };

    //from demo
    if ($scope.custom) {
      $scope.dragEffect = 'copyMove';
    } else {
      $scope.dragEffect = 'copy';
    }

    $scope.dragoverCallback = function(event, index) {
      //$scope.logListEvent('dragged over', event, index, external, type);
      $scope.logListEvent('dragged over', event, index);
      return index; // < 10;
    };

    $scope.dropCallback = function(event, index, item, external, type, allowedType) {
      //$scope.logListEvent('dropped at', event, index, external, type);
      console.log('dropped in saved shapes', item);
      $scope.onDropComplete(item, event);
      if (external) {
        //console.log('external', item);
        if (allowedType === 'true') {
          return false;
        }
        //if (allowedType === 'containerType' && !angular.isArray(item)) return false;
      }
      //return item;
    };

     $scope.logEvent = function(message, event) {
         console.log(message, '(triggered by the following', event.type, 'event)');
         console.log(event);
     };

     $scope.logListEvent = function(action, event, index, external, type) {
         var message = external ? 'External ' : '';
         message += type + ' element is ' + action + ' position ' + index;
         $scope.logEvent(message, event);
     };
  })



.controller('PagesCtrl', function($scope, $timeout, $rootScope, pagesData) {
    $rootScope.pages = pagesData;
    $rootScope.currentPage = pagesData[0];

    $scope.sortConfig = {
        group: 'foobar',
        animation: 150,
        // onSort: function( /** ngSortEvent */ evt) {
        //     // @see https://github.com/RubaXa/Sortable/blob/master/ng-sortable.js#L18-L24
        // }
    };
    $scope.addPage = function() {
        var length = $rootScope.pages.length;
        var uniqueID = new Date().getTime();
        var newPage = {
            name: 'New Page ' + (+length + 1),
            id: uniqueID,
        };
        $rootScope.pages.splice(length, 0, newPage);
        $timeout(function() {
            $rootScope.currentPage = newPage;
        }, 10); //delay so it selects after transition
    };
    $scope.duplicatePage = function(page, index) {
        var newPage = JSON.parse(JSON.stringify(page));
        var newindex = +index + 1;
        var uniqueID = new Date().getTime();

        newPage.id = uniqueID;
        newPage.name = page.name + ' Copy';
        $rootScope.pages.splice(newindex, 0, newPage);
        $timeout(function() {
            $rootScope.currentPage = newPage;
        }, 10);
        // $scope.selectedPage = uniqueID;
        //console.log(newpage, index);
    };
    $rootScope.masterPageCount = function() {
        var masterPageCount = [];
        angular.forEach($rootScope.pages, function(page) {
            if (page.master) {
                masterPageCount.push(page);
            }
            //console.log(masterPageCount);

        });
        return masterPageCount;
    };
    $scope.deletePage = function(page, index) {
        $rootScope.pages.splice(index, 1);
        //console.log(page, index);
        $timeout(function() {
            if ($rootScope.pages[index]) {
                $rootScope.currentPage = $rootScope.pages[index];
            } else {
                $rootScope.currentPage = $rootScope.pages[index - 1];
            }
        }, 10);
    };
    $scope.applyMaster = function(page) {
        page.masterapplied = true;
        console.log('page', page);
        $timeout(function() {
            page.masterapplied = false;
        }, 2000);
    };
    $scope.applyMasterAll = function() {
        console.log('master applied to all');
        angular.forEach($rootScope.pages, function(page) {
            if (!page.master) {
                $scope.applyMaster(page);
            }

        });

    };
});