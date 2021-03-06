/*global angular, console, SVGMorpheus*/
//include Components js
// @codekit-append "components/shape-manager/shape-manager.js"
// @codekit-append "components/pages/pages.js"
// @codekit-append "components/right-dock/right-dock.js"
// @codekit-append "components/optionbar/optionbar.js"
// @codekit-append "components/loading-tips/loading-tips.js"
// @codekit-append "components/canvas/canvas.js"

angular.module('particleApp', 
    [
        // loaded from particle.golucid.co
        'lucidComponents',
        'ngDraggable', 
        'ngSortable', 
        'dndLists',

        // Codekit append
        'canvas',
        'loadingTips',
        'optionbar',
        'pages',
        'pagesData', 
        'rightDock',
        'shapeManager',
        'lucidShapesData'
    ])
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'https://lucidsoftware.github.io/particle/**',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/**'
        ]);
    }])
    ////////////////
    ////START MAIN CTRL
    ////////////////
    .controller('mainCtrl', function($scope, $timeout, $rootScope) {
        $scope.savetext = 'Saved';
        $timeout(function() {
            //pause for a moment to load editor 
            $scope.showBody = true;
            console.log('show-body');
        }, 100);
        $rootScope.saveDocument = function() {
            $scope.savetext = 'Saving...';
            $timeout(function() {
                $scope.savetext = 'Saved';
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
        var timer; // js-lint fix
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

    });

angular.module('shapeManager', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    .controller('shapesManagerCtrl', function($scope, $rootScope, $filter, $window, $timeout, lucidShapesData) {
        $scope.$on('draggable:start', function() {
            $rootScope.draggingshape = true;
        });
        $scope.$on('draggable:move', function(event, data) {
            //console.log(event);
            var mouseX = window.event.clientX;
            if (mouseX < 250) {
                $rootScope.mouseInLeftPanel = true;
            } else {
                $rootScope.mouseInLeftPanel = false;
            }
            $rootScope.selectedBlock = data.data;
            $rootScope.$apply();
            //console.log(mouseX)
        });
        $scope.$on('draggable:end', function() {
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
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Flowchart Shapes',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Geometric Shapes',
            'image': 'assets/shapegroup-placeholder-shapes.png'
        }, {
            'groupname': 'Android Mockups',
            'image': 'assets/shapegroup-placeholder-android.png'
        }, {
            'groupname': 'Entity Relationship',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Site Maps',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'UI Mockups',
            'image': 'assets/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'UML',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'iOS 7 Mockups',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'BPMN 2.0',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Data Flow',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Org Charts',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Tables',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Value Stream',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'AWS Architecture',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Azure',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Cisco Network Icons',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Network Infrastructure',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Server Rack Diagrams',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Tech Clipart',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Circuit Diagrams',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Enterprise Integration',
            'image': 'assets/shapegroup-placeholder-flowchart.png'
        }, {
            'groupname': 'Equations',
            'image': 'assets/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'Floor Plans',
            'image': 'assets/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'Mind Mapping',
            'image': 'assets/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'Process Engineering',
            'image': 'assets/shapegroup-placeholder-computer.png'
        }, {
            'groupname': 'Venn Diagrams',
            'image': 'assets/shapegroup-placeholder-computer.png'
        }];
        $scope.setGroup = function(newIndex, oldIndex) {
            console.log('old index', oldIndex, 'new index', newIndex);
            $scope.DrawerOpenSameRow = false;
            if (newIndex === $scope.showGroupIndex) { // is the tab already open?
                $scope.showGroupIndex = null; // then empty the var

            } else if ($scope.showGroupIndex === null) { // no tab is open
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
                    if (lucidGroup.groupname === shapegroup.lucidgroup && shapegroup.pinned) {
                        $scope.unPinGroup(shapegroup);

                    }
                });
            }
            //else pin all
            else {
                angular.forEach($scope.lucidShapeGroups, function(shapegroup) {
                    if (lucidGroup.groupname === shapegroup.lucidgroup && !shapegroup.pinned) {
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

                if (lucidGroup.groupname === shapegroup.lucidgroup) {
                    //count number in this group
                    groupCount += 1;
                    if (shapegroup.pinned) {
                        //counted pinned
                        pinnedCount += 1;
                    }
                }
            });
            //console.log('pinnedCount', pinnedCount, 'length', groupCount)
            if (pinnedCount === groupCount && groupCount !== 0) {
                return true;
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
                return false;
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
                unpingroup = $scope.getObject(shapegroup.id, $scope.customShapeGroups);
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
            onStart: function() {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function() {
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
            onStart: function() {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function() {
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
            onStart: function() {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function() {
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
                    }, 600);

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

        $scope.dragoverCallback = function(event, index) {
            //$scope.logListEvent('dragged over', event, index, external, type);
            // Disallow dropping in the third row. Could also be done with dnd-disable-if.
            return index < 10;
        };

        $scope.dropCallback = function(event, index, item, external, type, allowedType) {
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
        $scope.editName = function(shapegroup) {
            $timeout(function() {
                //console.log('edit?', shapegroup.edit);
                shapegroup.edit = true;
                //console.log('edit?', shapegroup.edit);
            }, 100);
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
    });

angular.module('pages', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    .controller('PagesCtrl', function($scope, $timeout, $rootScope, pagesData) {
        $rootScope.pages = pagesData;
        $rootScope.currentPage = pagesData[0];
        $rootScope.currentPageNumber = 1;
        $scope.editName = function(page) {
            $timeout(function() {
                //console.log('edit?', shapegroup.edit);
                page.edit = true;
                //console.log('edit?', shapegroup.edit);
            }, 100);


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
    });

angular.module('rightDock', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    .controller('RightDockCtrl', function($scope, $rootScope) {
        $scope.openTab = "";
        $scope.showTooltipPresent = true;
        $scope.showTooltipHistory = true;

        $scope.closeRightDock = function() {
            if( !$scope.openTab ) {
                $rootScope.setTab('pageSettings');
            } else {
                $rootScope.setTab('');
            }
        };

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
    });

angular.module('optionbar', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    ////////////////
    ////START LINE PATH CTRL -> these are here to create smooth transitions between button states.
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
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-top-left-22px.svg",
        }, {
            "verticalalignment": "top",
            "horizontalalignment": "center",
            "name": "top-center",
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-top-center-22px.svg",
        }, {
            "verticalalignment": "top",
            "horizontalalignment": "right",
            "name": "top-right",
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-top-right-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "left",
            "name": "center-left",
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-center-left-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "center",
            "name": "center-center",
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-center-center-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "right",
            "name": "center-right",
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-center-right-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "left",
            "name": "bottom-left",
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-bottom-left-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "center",
            "name": "bottom-center",
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-bottom-center-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "right",
            "name": "bottom-right",
            "icon": "https://lucidsoftware.github.io/particle/components/3.0/icon/icons/icon-text-bottom-right-22px.svg",
        }];
    });

angular.module('loadingTips', [])
    .controller('loadingTipsCtrl', function($scope, $timeout) {
        $scope.loading = 0;
        $timeout(function() {
            $scope.loading = 100;
        }, 10);
        $timeout(function() {
            // $element.removeClass('hide-body');
            // $scope.$root.showbetatips = true; //removed for latest prototype
            $scope.$root.loaded = true;
        }, 4500);
        $scope.showTip = (Math.ceil(Math.random() * 3));
        $scope.newTip = function() {
            $scope.showTip = $scope.showTip + 1;
            if ($scope.showTip === 6) {
                $scope.showTip = 1;
            }
        };
    });

angular.module('canvas', [])
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
                        return;
                    }
                    data.metrics.x = event.x - canvasX - event.element.centerX;
                    data.metrics.y = event.y - canvasY - event.element.centerY;
                    data.shapepanel = false;
                }
            }
        };
    });

