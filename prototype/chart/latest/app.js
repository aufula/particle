/*global angular : true fixes codekit error*/
/*global console : true fixes codekit error*/

angular.module('particleApp', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    ////////////////
    ////START MAIN CTRL
    ////////////////
    .controller('mainCtrl', function($scope, $timeout, $rootScope) {
        $scope.savetext = 'saved';
        $rootScope.saveDocument = function() {
            $scope.savetext = 'saving...';
            $timeout(function() {
                $scope.savetext = 'saved';
            }, 1000);

        };
        $rootScope.selectedBlock = {
            text: {
                size: 12
            }
        };
        $scope.canvasmode = 0;
        $scope.canvasMode = function() {
            if ($scope.canvasmode === 0) {
                $scope.hideLeftPanel = true;
                $scope.hideRightPanel = true;
                $scope.hideFooter = true;

                $scope.canvasmode = 1;
                console.log('Mode 1');
                return;
            }
            if ($scope.canvasmode === 1) {
                $scope.hideToolbar = true;
                $scope.hideHeader = true;
                $scope.canvasmode = 2;
                console.log('Mode 2');
                return;
            }
            if ($scope.canvasmode === 2) {
                $scope.hideLeftPanel = false;
                $scope.hideRightPanel = false;
                $scope.hideFooter = false;
                $scope.hideToolbar = false;
                $scope.hideHeader = false;
                $scope.canvasmode = 0;
                console.log('Standard Canvas');
                return;
            }

        };
        //Start function for showing and hiding panels
        $scope.enterOptionBar = function() {
            if (!$scope.hideHeader) {
                $scope.hideHeader = true;
                $scope.hideToolbar = true;
            } else {
                timer = $timeout(function() {
                    $scope.hideHeader = false;
                    $scope.hideToolbar = false;
                    console.log('enter optionbar');
                }, 400);
            }
        };
        $scope.enterRightPanel = function() {
            if (!$scope.hideRightPanel) {
                //hide instantly
                $scope.hideRightPanel = true;
                //else wait to show
            } else {
                timer = $timeout(function() {
                    $scope.hideRightPanel = false;
                    console.log('enter right panel');
                }, 400);
            }
        };
        $scope.enterLeftPanel = function() {
            if (!$scope.hideLeftPanel) {
                //hide instantly
                $scope.hideLeftPanel = true;
                //else wait to show
            } else {
                timer = $timeout(function() {
                    $scope.hideLeftPanel = false;
                    console.log('enter left panel');
                }, 400);
            }
        };
        $scope.cancelHover = function() {
            $timeout.cancel(timer);
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
    ////////////////
    ////START RIGHT DOCK CTRL
    ////////////////
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
    ////START PAGES CTRL
    ////////////////
    .controller('PagesCtrl', function($scope, $timeout, $rootScope, pagesData) {
        $rootScope.pages = pagesData;
        $rootScope.currentPage = pagesData[0];
        $rootScope.currentPageNumber = 1;
        $scope.editName = function(page) {
            $timeout(function() {
                //console.log('edit?', shapegroup.edit);
                page.edit = true;
                //console.log('edit?', shapegroup.edit);
            }, 100)


        };
        $scope.changePage = function(page) {
            var resetPage = {
                name: page.name,
                blocks: []
            };
            // this is used to keep the name the same, and empty the blocks on the page
            // so that the blocks don't animate in every time the page loads.
            // used with ng-if on the ul of items on the canvas.
            $rootScope.currentPage = resetPage;
            $timeout(function() {
                $rootScope.currentPage = page;
                $rootScope.currentPageNumber = $rootScope.pages.indexOf(page) + 1;
                $rootScope.saveDocument();
            }, 10);
        };
        $scope.addPage = function() {
            var length = $rootScope.pages.length;
            var uniqueID = new Date().getTime();
            var newPage = {
                name: 'New Page ' + (+length + 1),
                id: uniqueID,
                blocks: [''] //empty block added so that the ul shows up
            };
            $rootScope.pages.splice(length, 0, newPage);
            $timeout(function() {
                $scope.changePage(newPage);
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
                $scope.changePage(newPage);
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
                    $scope.changePage($rootScope.pages[index]);
                } else {
                    $scope.changePage($rootScope.pages[index - 1]);
                }
            }, 10);
            $rootScope.saveDocument();
        };

        $scope.nextPage = function() {
            var index = $rootScope.pages.indexOf($rootScope.currentPage);
            $scope.changePage($rootScope.pages[index + 1]);
        };
        $scope.previousPage = function() {
            var index = $rootScope.pages.indexOf($rootScope.currentPage);
            $scope.changePage($rootScope.pages[index - 1]);
        };
        $scope.applyMaster = function(page) {
            page.masterapplied = true;
            console.log('page', page);
            $timeout(function() {
                page.masterapplied = false;
            }, 2000);
            $rootScope.saveDocument();
        };
        $scope.applyMasterAll = function() {
            console.log('master applied to all');
            angular.forEach($rootScope.pages, function(page) {
                if (!page.master) {
                    $scope.applyMaster(page);
                }
            });

        };
        $rootScope.saveDocument();
    })
    ////////////////
    ////START LINE PATH CTRL
    ////////////////
    .controller('linePathCtrl', function($scope, $timeout) {

        // angular.element(document).ready(function() {
        //     $scope.lucidPath = new SVGMorpheus('#lucid-path-style');
        // });

        $timeout(function() {
            $scope.lucidPath = new SVGMorpheus('#lucid-path-style');
        }, 1400);

        $scope.changePath = function(path) {
            if (path === 'straight') {
                $scope.lucidPath.to('lucid-straight-path', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (path === 'curved') {
                $scope.lucidPath.to('lucid-curve-path', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (path === 'angle') {
                $scope.lucidPath.to('lucid-angle-path', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            $scope.showpopover = false;
        };
        $scope.pathstyles = [{
            "name": "curved",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-line-curved-bluesteel.svg",
        }, {
            "name": "angle",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-line-angle-bluesteel.svg",
        }, {
            "name": "straight",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-line-straight-bluesteel.svg",
        }];
        $scope.pathstyle = $scope.pathstyles[0];

    })
    ////////////////
    ////START TEXT ALIGNMENT CTRL
    ////////////////
    .controller('textAlignmentCtrl', function($scope, $timeout) {

        $timeout(function() {
            $scope.lucidPath = new SVGMorpheus('#lucid-text-align');
        }, 1400);

        // angular.element(document).ready(function() {
        //     $scope.lucidPath = new SVGMorpheus('#lucid-text-align');
        // });
        //set default state if no object is selected
        if (!$scope.selected) {
            $scope.selected = {};
            $scope.selected.text = {
                "verticalalignment": "middle",
                "horizontalalignment": "center"
            };
        }

        $scope.changeAlignment = function(vertical, horizontal) {
            $scope.selected.text.verticalalignment = vertical;
            $scope.selected.text.horizontalalignment = horizontal;
            if (vertical === 'top' && horizontal === 'left') {
                $scope.lucidPath.to('lucid-text-top-left', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });

            }
            if (vertical === 'top' && horizontal === 'center') {
                $scope.lucidPath.to('lucid-text-top-center', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'top' && horizontal === 'right') {
                $scope.lucidPath.to('lucid-text-top-right', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            //middle
            if (vertical === 'middle' && horizontal === 'left') {
                $scope.lucidPath.to('lucid-text-middle-left', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'middle' && horizontal === 'center') {
                $scope.lucidPath.to('lucid-text-middle-center', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'middle' && horizontal === 'right') {
                $scope.lucidPath.to('lucid-text-middle-right', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }

            //bottom

            if (vertical === 'bottom' && horizontal === 'left') {
                $scope.lucidPath.to('lucid-text-bottom-left', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'bottom' && horizontal === 'center') {
                $scope.lucidPath.to('lucid-text-bottom-center', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            if (vertical === 'bottom' && horizontal === 'right') {
                $scope.lucidPath.to('lucid-text-bottom-right', {
                    duration: 400,
                    easing: 'quad-out',
                    rotation: 'none'
                });
            }
            $scope.showpopup = false;

        };
        $scope.alignment = [{
            "verticalalignment": "top",
            "horizontalalignment": "left",
            "name": "top-left",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_top-left-bluesteel.svg",
        }, {
            "verticalalignment": "top",
            "horizontalalignment": "center",
            "name": "top-center",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_top-center-bluesteel.svg",
        }, {
            "verticalalignment": "top",
            "horizontalalignment": "right",
            "name": "top-right",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_top-right-bluesteel.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "left",
            "name": "center-left",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_center-left-bluesteel.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "center",
            "name": "center-center",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_center-center-bluesteel.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "right",
            "name": "center-right",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_center-right-bluesteel.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "left",
            "name": "bottom-left",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_bottom-left-bluesteel.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "center",
            "name": "bottom-center",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_bottom-center-bluesteel.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "right",
            "name": "bottom-right",
            "icon": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/icon-alignment_bottom-right-bluesteel.svg",
        }];
    })
    ////////////////
    ////START SHAPES MANAGER CTRL
    ////////////////
    .controller('shapesManagerCtrl', function($scope, $rootScope, $filter, $window, $timeout, lucidShapesData) {
        $scope.$on('draggable:start', function(event, data) {
            $rootScope.draggingshape = true;
        });
        $scope.$on('draggable:move', function(event, data) {
            //console.log(event);
            var mouseX = window.event.clientX
            if (mouseX < 250) {
                $rootScope.mouseInLeftPanel = true;
            } else {
                $rootScope.mouseInLeftPanel = false;
            }
            $rootScope.selectedBlock = data.data;
            $rootScope.$apply();
            //console.log(mouseX)
        });
        $scope.$on('draggable:end', function(event, data) {
            $rootScope.draggingshape = false;
            $rootScope.mouseInLeftPanel = false;
            $rootScope.saveDocument();
        });
        $scope.focusSearch = function(searchshapes) {
            console.log(searchshapes);
            if (searchshapes) {
                var elementID = 'search-shapes-input';
                $timeout(function() {
                    document.getElementById(elementID).focus();
                }, 10);
            }
        };
        $scope.lucidGroups = [{
            'groupname': 'Default',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Flowchart Shapes',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Geometric Shapes',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-shapes.png'
        }, {
            'groupname': 'Android Mockups',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-android.png'
        }, {
            'groupname': 'Entity Relationship',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Site Maps',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'UI Mockups',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'UML',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'iOS 7 Mockups',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'BPMN 2.0',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Data Flow',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Org Charts',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Tables',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Value Stream',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'AWS Architecture',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Azure',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Cisco Network Icons',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Network Infrastructure',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Server Rack Diagrams',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Tech Clipart',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Circuit Diagrams',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Enterprise Integration',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Equations',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'Floor Plans',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'Mind Mapping',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'Process Engineering',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'Venn Diagrams',
            'image': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/shapegroup-placeholder-computer.png'
        }];
        $scope.setGroup = function(newIndex, oldIndex) {
            console.log('old index', oldIndex, 'new index', newIndex);
            $scope.DrawerOpenSameRow = false;
            if (newIndex === $scope.showGroupIndex) { // is the tab already open?
                $scope.showGroupIndex = null; // then empty the var

            } else if ($scope.showGroupIndex == null) { // no tab is open
                $scope.showGroupIndex = newIndex;

            } else { //switching tabs
                //check if the two options are within the same row (only coded row 1 and 2)
                if ((newIndex < 4 && oldIndex < 4) || (newIndex > 3 && oldIndex > 3 && newIndex < 8 && oldIndex < 8)) {
                    console.log('same row');
                    $scope.DrawerOpenSameRow = true;
                    $timeout(function() {
                        $scope.DrawerOpenSameRow = false;
                    }, 100);
                }
                $scope.showGroupIndex = newIndex; // set the tab
            }
        };
        $scope.toggleGroupPin = function(lucidGroup) {
            //console.log(lucidGroup.groupname);
            //if pinned, unpin all
            if ($scope.lucidGroupPinned(lucidGroup)) {
                angular.forEach($scope.lucidShapeGroups, function(shapegroup) {
                    if (lucidGroup.groupname == shapegroup.lucidgroup && shapegroup.pinned) {
                        $scope.unPinGroup(shapegroup);

                    }
                });
            }
            //else pin all
            else {
                angular.forEach($scope.lucidShapeGroups, function(shapegroup) {
                    if (lucidGroup.groupname == shapegroup.lucidgroup && !shapegroup.pinned) {
                        $scope.pinGroup(shapegroup);

                    }
                });
                //show pinned message 
                $timeout(function() {
                    $scope.showPinMessage(lucidGroup);
                }, 1000);
            }

        };
        $scope.lucidGroupPinned = function(lucidGroup) {
            var pinnedCount = 0;
            var groupCount = 0;
            angular.forEach($scope.lucidShapeGroups, function(shapegroup) {

                if (lucidGroup.groupname == shapegroup.lucidgroup) {
                    //count number in this group
                    groupCount += 1;
                    if (shapegroup.pinned) {
                        //counted pinned
                        pinnedCount += 1;
                    }
                }
            });
            //console.log('pinnedCount', pinnedCount, 'length', groupCount)
            if (pinnedCount == groupCount && groupCount != 0) {
                return true
            } else {
                return false;
            }
        };

        $scope.pinnedShapeGroups = lucidShapesData.pinnedShapeGroups();
        $scope.lucidShapeGroups = lucidShapesData.lucidShapeGroups();
        $scope.customShapeGroups = lucidShapesData.customShapeGroups();
        $scope.pinned = function(id) {
            if (lucidShapesData.pinned(id)) {
                //console.log(lucidShapesData.pinned(id))
                return true;
            } else {
                return false
            }
        };
        $scope.showPinMessage = function(shapegroup) {
            //add message
            var overflow = document.getElementById('left-panel-shapes').offsetHeight - document.getElementById('left-panel-shapes-scroll').offsetHeight;

            //console.log('overflow: ', overflow);

            if (overflow < 125) {
                $scope.overflowMessage = true;
                $scope.overflowMessageTitle = shapegroup.groupname;
                $timeout(function() {
                    $scope.overflowMessage = false;
                }, 2000);
            }
        };
        $scope.pinGroup = function(shapegroup) {
            $rootScope.saveDocument();
            $scope.pinnedShapeGroups.push(shapegroup);
            $scope.showPinMessage(shapegroup);
            shapegroup.pinned = true;
            //console.log('pin');
        };
        angular.forEach($scope.customShapeGroups, function(shapegroup) {
            if (shapegroup.pinned) {
                $scope.pinGroup(shapegroup);
            }
        });
        angular.forEach($scope.lucidShapeGroups, function(shapegroup) {
            if (shapegroup.pinned) {
                $scope.pinGroup(shapegroup);
            }
        });
        $scope.unPinGroup = function(shapegroup) {
            $rootScope.saveDocument();
            //filter the array
            var findShapegroup = $scope.getObject(shapegroup.id, $scope.pinnedShapeGroups);
            //get the index
            var index = $scope.pinnedShapeGroups.indexOf(findShapegroup);
            //console.log('index', index);
            $scope.pinnedShapeGroups.splice(index, 1);
            shapegroup.pinned = false;
            //console.log('unpin');

            var unpingroup = $scope.getObject(shapegroup.id, $scope.lucidShapeGroups);
            if (!unpingroup) {
                var unpingroup = $scope.getObject(shapegroup.id, $scope.customShapeGroups);
            }
            unpingroup.pinned = false;
        };


        $scope.getObject = function(objectID, array) {
            return $filter('filter')(array, {
                id: objectID
            }, true)[0];
        };
        $scope.togglePin = function(shapegroup) {
            if (shapegroup.pinned) {
                $scope.unPinGroup(shapegroup);
            } else {
                $scope.pinGroup(shapegroup);
            }
        };


        //start drag and reoder shape groups
        $scope.pinnedGroupsSort = {
            group: {
                name: 'pinned',
                put: ['custom', 'lucid'],
                pull: false
            },
            model: 'shapegroup',
            handle: '.shape-group-top',
            animation: 150,
            onAdd: function(evt) {
                var shapegroup = $scope.getObject(evt.model.id, $scope.lucidShapeGroups);
                if (!shapegroup) {
                    shapegroup = $scope.getObject(evt.model.id, $scope.customShapeGroups);
                }
                shapegroup.pinned = true;
                //console.log('add', evt.model);
                $rootScope.draggingShapeGroup = false;
                $rootScope.saveDocument();
            },
            onStart: function(evt) {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function(evt) {
                $rootScope.draggingShapeGroup = false;
                $rootScope.saveDocument();
            },
        };

        $scope.customGroupsSort = {
            group: {
                name: 'custom',
                pull: 'clone'
            },
            ghostClass: 'ng-sort-ghost',
            model: 'shapegroup',
            filter: '.shapegroup-pinned',
            handle: '.shape-group-top',
            animation: 150,
            onStart: function(evt) {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function(evt) {
                $rootScope.draggingShapeGroup = false;
            },
        };

        $scope.lucidGroupsSort = {
            sort: false,
            group: {
                name: 'lucid',
                pull: 'clone'
            },
            ghostClass: 'ng-sort-ghost',
            model: 'shapegroup',
            filter: '.shapegroup-pinned',
            handle: '.shape-group-top',
            animation: 150,
            onStart: function(evt) {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function(evt) {
                $rootScope.draggingShapeGroup = false;
            },
        };
        //end drag and reorder shape groups


        $rootScope.manageshapes = false;
        $scope.lucidShapesLimit = 14;
        $rootScope.toggleShapesManager = function() {

            if (!$scope.searchshapes && !$scope.importToCanvas) {
                if (!$rootScope.manageshapes) {
                    //manage shapes
                    $rootScope.manageshapes = true;
                    $timeout(function() {
                        $scope.lucidShapesLimit = 50;
                    }, 1000); //wait until first slide open is done, then load groups
                    $timeout(function() {
                        $scope.loadingshapes = true;
                    }, 600)

                } else {
                    $rootScope.manageshapes = false;
                    $timeout(function() {
                        $scope.lucidShapesLimit = 10;
                        $scope.loadingshapes = false;
                    }, 1000); //wait until manager slide is closed.
                }

            } else {

                $scope.searchshapes = false;
                $scope.importToCanvas = false;
            }
        };

        $scope.copy = function(type) {
            if (type === 'custom') {
                return 'copyMove';
            } else {
                return 'copy';
            }
        };

        $scope.dropFromCanvas = function(data, event, shapegroup) {

            if (data && shapegroup.custom) {
                var index = shapegroup.shapes.indexOf(data);
                //console.log('shape', index);

                if (index === -1) {
                    //var index = $scope.shapegroups.shapegroup.indexOf(data);
                    //console.log(index);
                    var newblock = JSON.parse(JSON.stringify(data));

                    newblock.shapepanel = true;
                    newblock.customcolor = true;
                    newblock.comment = null;
                    if (!newblock.url) {
                        //this is here so that we can save any shape from the library for reuse.
                        newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
                    }
                    shapegroup.shapes.push(newblock);
                }
                //console.log('dropped in saved shapes', data, event, shapegroup);
            }

        };

        /////// START DRAGGING SHAPES STUFF

        $scope.dragoverCallback = function(event, index, external, type) {
            //$scope.logListEvent('dragged over', event, index, external, type);
            // Disallow dropping in the third row. Could also be done with dnd-disable-if.
            return index < 10;
        };

        $scope.dropCallback = function(event, index, item, external, type, allowedType, shapegroup) {
            //$scope.logListEvent('dropped at', event, index, external, type);
            if (external) {
                if (allowedType === 'itemType' && !item.label) {
                    return false;
                }
                if (allowedType === 'containerType' && !angular.isArray(item)) {
                    return false;
                }
            }
            return item;
        };

        // $scope.logEvent = function(message, event) {
        //     console.log(message, '(triggered by the following', event.type, 'event)');
        //     console.log(event);
        // };

        // $scope.logListEvent = function(action, event, index, external, type) {
        //     var message = external ? 'External ' : '';
        //     message += type + ' element is ' + action + ' position ' + index;
        //     $scope.logEvent(message, event);
        // };

        /////// END DRAGGIN SHAPES STUFF

        $scope.newCustomGroup = function() {
            var newGroup = {
                "id": new Date().getTime(),
                "groupname": "New Group",
                "custom": 'custom',
                "edit": true,
                "shapes": [],
            };
            $scope.customShapeGroups.splice(0, 0, newGroup);
            $rootScope.saveDocument();
        };
        $scope.editName = function(shapegroup, index) {
            $timeout(function() {
                //console.log('edit?', shapegroup.edit);
                shapegroup.edit = true;
                //console.log('edit?', shapegroup.edit);
            }, 100)
            $rootScope.saveDocument();


        };
        $scope.duplicateShapeGroup = function(shapegroup) {

            var newGroup = JSON.parse(JSON.stringify(shapegroup));
            newGroup.id = new Date().getTime();
            newGroup.groupname = shapegroup.groupname + ' Copy';
            //console.log(newGroup)
            $scope.customShapeGroups.splice(0, 0, newGroup);
            $scope.editName(newGroup, 0);
            $rootScope.saveDocument();
        };

        $scope.openWindow = function(url) {
            window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
        };
        //start search shape function
        $scope.searchgroups = {};
        $scope.searchgroups.searched = false;
        $scope.searchShapeGroups = function(searchInput) {

            $scope.searchShapeGroupsResults = $filter('filter')($scope.lucidShapeGroups, searchInput);
            $scope.filterShapes = searchInput;
            $scope.searchgroups.searched = true;
        };
    })
    ////////////////
    ////END SHAPES MANAGER CTRL
    ////////////////
    ////////////////
    ////START CANVAS CTRL
    ////////////////
    .controller('loadingTipsCtrl', function($scope) {
        $scope.loading = 100;
        $scope.showTip = (Math.ceil(Math.random() * 3));
        $scope.newTip = function() {
            $scope.showTip = $scope.showTip + 1;
            if ($scope.showTip === 6) {
                $scope.showTip = 1;
            }
        };
    })
    .controller('canvasCtrl', function($scope, $rootScope) {
        $scope.clickLine = function() {
            //alert('clicked');
            $rootScope.selectedType = 'line';
            //console.log('clicked');
        };
        $scope.lucidSlides = [{
            "x": 368,
            "y": 100,
            "height": 120,
            "width": 160
        }, {
            "x": 60,
            "y": 210,
            "height": 300,
            "width": 400
        }, {
            "x": 480,
            "y": 300,
            "height": 300,
            "width": 400
        }];
        $scope.blocks = $rootScope.currentPage.blocks;
        $rootScope.selectedType = 'nothing';
        $scope.deselectBlock = function() {
            var deselect = JSON.parse(JSON.stringify($rootScope.selectedBlock));
            deselect.table = false;
            $rootScope.selectedBlock = deselect;
            //console.log('deselectBlock');
        };

        /////// START DRAGGING SHAPES STUFF

        $scope.dragoverCallback = function(event, index, external, type) {
            $scope.logListEvent('dragged over canvas', event, index, external, type);
            // Disallow dropping in the third row. Could also be done with dnd-disable-if.
            return index < 10;
        };

        $scope.dropCallback = function(event, index, item, external, type, allowedType) {
            $scope.logListEvent('dropped at canvas', event, index, external, type);
            if (external) {
                if (allowedType === 'itemType' && !item.label) {
                    return false;
                }
                if (allowedType === 'containerType' && !angular.isArray(item)) {
                    return false;
                }
            }
            return item;
        };

        // $scope.logEvent = function(message, event) {
        //     console.log(message, '(triggered by the following', event.type, 'event)');
        //     console.log(event);
        // };

        // $scope.logListEvent = function(action, event, index, external, type) {
        //     var message = external ? 'External ' : '';
        //     message += type + ' element is ' + action + ' position ' + index;
        //     $scope.logEvent(message, event);
        // };

        /////// END DRAGGIN SHAPES STUFF

        $scope.dropToCanvas = function(item, event) {
            $rootScope.saveDocument();
            var index = $rootScope.currentPage.blocks.indexOf(item);

            if (index === -1 && item) {
                //if dragging shape with no metrics such as a star, etc.
                if (!item.metrics) {
                    item = {
                        "customcolor": false,
                        "swatch": {
                            "fill": "#ffffff",
                            "text": "#333333",
                            "border": "#666666"
                        },
                        "swatchnumber": 1,
                        "borderwidth": 3,
                        "borderstyle": "solid",
                        "text": {
                            "verticalalignment": "middle",
                            "horizontalalignment": "center",
                            "text": item.name,
                            "size": "12px"
                        },
                        "padding": 10,
                        "metrics": {
                            "z": 2,
                            "width": 120,
                            "height": 45
                        },
                        "shapepanel": false
                    };
                }
                //set the position based on where it dropped and the width of the block.
                var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;

                item.metrics.x = event.pageX - canvasX - (item.metrics.width / 2);
                item.metrics.y = event.pageY - canvasY - (item.metrics.height / 2);

                //console.log('shape', item, event.pageX, event.pageY, 'total: ', event);

                $rootScope.currentPage.blocks.push(item);
                $rootScope.selectedBlock = item;

            }

        };
        $scope.onDragSuccess = function(data, event) {
            //console.log(event);
            if (event.x > 250) {
                var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;
                //console.log('drag success', data, event);
                if (data) {
                    if (angular.element(event.event.srcElement).hasClass('lucid-block-comment')) {
                        //console.log('comment');
                        return
                    }
                    data.metrics.x = event.x - canvasX - event.element.centerX;
                    data.metrics.y = event.y - canvasY - event.element.centerY;
                    data.shapepanel = false;
                }
            }
        };
    })
    .directive('hideUntilLoaded', ['$timeout', function($timeout) {
        return {
            priority: -10000, // a low number so this directive loads after all other directives have loaded. 
            restrict: "A", // attribute only
            link: function($scope, $element, $attributes) {
                console.log("Loaded");
                $timeout(function() {
                    $element.removeClass('hide-body');
                    $scope.$root.showbetatips = true; //removed for latest prototype
                    $scope.$root.loaded = true;
                }, 4500)

            }
        };
    }])
    //this is used with shape libraries
    .animation('.shape-manager-drawer', ['$animateCss', function($animateCss) {
        var lastId = 0;
        var _cache = {};

        function getId(el) {
            var id = el[0].getAttribute("data-slide-toggle");
            if (!id) {
                id = ++lastId;
                el[0].setAttribute("data-slide-toggle", id);
            }
            return id;
        }

        function getState(id) {
            var state = _cache[id];
            if (!state) {
                state = {};
                _cache[id] = state;
            }
            return state;
        }

        function generateRunner(closing, state, animator, element, doneFn) {
            return function() {
                state.animating = true;
                state.animator = animator;
                state.doneFn = doneFn;
                animator.start().finally(function() {
                    if (closing && state.doneFn === doneFn) {
                        element[0].style.height = '';
                    }
                    if (!closing && state.doneFn === doneFn) {
                        element[0].style.height = '';
                    }
                    state.animating = false;
                    state.animator = undefined;
                    state.doneFn();
                });
            };
        }

        return {
            addClass: function(element, className, doneFn) {
                if (className === 'ng-hide') {
                    var state = getState(getId(element));
                    var height = (state.animating && state.height) ?
                        state.height : element[0].offsetHeight;

                    var animator = $animateCss(element, {
                        from: {
                            height: height + 'px',
                        },
                        to: {
                            height: '0px',
                        }
                    });
                    if (animator) {
                        if (state.animating) {
                            state.doneFn =
                                generateRunner(true,
                                    state,
                                    animator,
                                    element,
                                    doneFn);
                            return state.animator.end();
                        } else {
                            state.height = height;
                            return generateRunner(true,
                                state,
                                animator,
                                element,
                                doneFn)();
                        }
                    }
                }
                doneFn();
            },
            removeClass: function(element, className, doneFn) {
                if (className === 'ng-hide') {
                    var state = getState(getId(element));
                    var height = (state.animating && state.height) ?
                        state.height : element[0].offsetHeight;

                    var animator = $animateCss(element, {
                        from: {
                            height: '0px',
                            opacity: 0
                        },
                        to: {
                            height: height + 'px',
                            opacity: 1
                        }
                    });

                    if (animator) {
                        if (state.animating) {
                            state.doneFn = generateRunner(false,
                                state,
                                animator,
                                element,
                                doneFn);
                            return state.animator.end();
                        } else {
                            state.height = height;
                            return generateRunner(false,
                                state,
                                animator,
                                element,
                                doneFn)();
                        }
                    }
                }
                doneFn();
            }
        };

    }])
    .directive('pressM', [function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                console.log('keypress', event.which);
                if (event.which === 77) { // 77 = M key
                    scope.$apply(function() {
                        scope.$eval(attrs.pressM);
                    });

                    event.preventDefault();
                }
            });
        };
    }]);