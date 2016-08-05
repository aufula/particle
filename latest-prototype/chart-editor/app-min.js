angular.module('shapeManager', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    .controller('shapesManagerCtrl', function($scope, $rootScope, $filter, $window, $timeout, lucidShapesData) {
        $scope.$on('draggable:start', function(event, data) {
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
    });

angular.module('pagesData', [])
    //chart data
    .factory('pagesData', [function() {
        //this factory will contain page data, block elements, positoins etc.
        var lucidPages = [{
            'name': 'Page 1',
            'thumb': 'assets/thumb-placeholder-flowchart.png',
            'id': 14543,
            'canvasBG': '#FFF',
            'blocks': [{
                "customcolor": false,
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#AEAEAE",
                    "border": "#666666"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "comment": {
                    "text": "yep this is a comment"
                },
                "table": true,
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Process",
                    "size": 16,
                },

                "padding": 7,
                "metrics": {
                    "z": 2,
                    "x": 75,
                    "y": 75,
                    "width": 120,
                    "height": 100
                },
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'

            }, {
                "customcolor": false,
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#AEAEAE",
                    "border": "#666666"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Process",
                    "size": 16,
                },

                "padding": 7,
                "metrics": {
                    "z": 2,
                    "x": 75,
                    "y": 243,
                    "width": 120,
                    "height": 80
                },


            }],
            'lines': [{
                "points": "450.5 184 450.5 240",
                "endarrow": true,
                "width": 3,
            }],
            'linecolor': '#333'
        }];
        return lucidPages;
    }]);

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
    })

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
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-top-left-22px.svg",
        }, {
            "verticalalignment": "top",
            "horizontalalignment": "center",
            "name": "top-center",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-top-center-22px.svg",
        }, {
            "verticalalignment": "top",
            "horizontalalignment": "right",
            "name": "top-right",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-top-right-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "left",
            "name": "center-left",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-center-left-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "center",
            "name": "center-center",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-center-center-22px.svg",
        }, {
            "verticalalignment": "middle",
            "horizontalalignment": "right",
            "name": "center-right",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-center-right-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "left",
            "name": "bottom-left",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-bottom-left-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "center",
            "name": "bottom-center",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-bottom-center-22px.svg",
        }, {
            "verticalalignment": "bottom",
            "horizontalalignment": "right",
            "name": "bottom-right",
            "icon": "http://particle.golucid.co/components/3.0/icon/icons/icon-text-bottom-right-22px.svg",
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
                        return;
                    }
                    data.metrics.x = event.x - canvasX - event.element.centerX;
                    data.metrics.y = event.y - canvasY - event.element.centerY;
                    data.shapepanel = false;
                }
            }
        };
    });

angular.module('lucidShapesData', [])
    //shapes data
    .factory('lucidShapesData', [function() {

        var lucidShapes = [{
            "id": 2,
            "groupname": "Standard",
            "lucidgroup": "Default",
            "shapes": [{
                "name": "text",
                "tags": "Standard",
                "url": "assets/icon-shapes-text.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-fill-text" sketch:type="MSArtboardGroup" font-size="29" font-family="Baskerville" fill="#828282" font-weight="526"><text id="T" sketch:type="MSTextLayer"><tspan x="5" y="25">T</tspan></text></g></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatchtype": "text",
                "swatch": {
                    "fill": "transparent",
                    "text": "#8D8D8D",
                    "border": "transparent"
                },
                "swatchnumber": 2,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "INSERT TEXT",
                    "size": 12,
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                },
            }, {
                "name": "block",
                "tags": "Standard",
                "url": "assets/icon-shapes-block.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Rectangle-32-+-T-Copy-2" sketch:type="MSLayerGroup" transform="translate(1.000000, 2.000000)"class="lucid-shapes-fill-stroke"  stroke="#979797" fill="#FFFFFF"><rect stroke-width="2" sketch:type="MSShapeGroup" x="0" y="0" width="28" height="26" rx="2"></rect><text id="T-Copy" sketch:type="MSTextLayer" font-family="Baskerville" font-size="18" font-weight="526" fill="#828282"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#A1A1A1",
                    "border": "#A1A1A1"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Text",
                    "size": 12,
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }, {
                "name": "note",
                "tags": "Standard",
                "url": "assets/icon-shapes-note.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Group-Copy-3" sketch:type="MSLayerGroup" transform="translate(2.000000, 1.6)"><path d="M0,0.399535424 L18,0.399535424 L26,8.39953542 L26,26.3995354 L0,26.3995354 L0,0.399535424 Z" id="Rectangle-32-Copy-2" fill="#FFCF54" sketch:type="MSShapeGroup"></path><path d="M2,2.39953542 C2,2.39953542 19.0546875,2.417638 19,2.39953542 L24,8.51064654 L24,24.3995354 L2,24.3995354 L2,2.39953542 Z" id="Rectangle-40" fill="#FFDD87" sketch:type="MSShapeGroup"></path><rect id="Rectangle-398-Copy-9" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="7.39953542" width="8" height="2"></rect><rect id="Rectangle-398-Copy-7" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="12.3995354" width="14" height="2"></rect><rect id="Rectangle-398-Copy-8" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="17.3995354" width="10" height="2"></rect><path d="M18,0.399535424 L18,8.39953542 L26,8.39953542 L18,0.399535424 Z" id="Path-748" fill="#F8C136" sketch:type="MSShapeGroup"></path></g></svg>',

                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "#FFE192",
                    "text": "#CCA330",
                    "border": "#FFD55E"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Note",
                    "size": 12,
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }, {
                "name": "hotspot",
                "tags": "Standard",
                "url": "assets/icon-shapes-hotspot.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Artboard-4" sketch:type="MSArtboardGroup" fill="#019281"><rect id="Rectangle-32" fill-opacity="0.400000006" sketch:type="MSShapeGroup" x="2" y="2" width="26" height="26" rx="4"></rect><path d="M14.406079,7 L19.3938968,7 L15.0462468,13.8583375 L20.5,13.8583373 L12.4175106,24.3948897 L15.4176795,16.9625774 L9.5,16.9625774 L14.406079,7 Z" id="Path-696-Copy" sketch:type="MSShapeGroup"></path></g></svg>',
                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "rgba(78, 202, 186, 0.5)",
                    "text": "transparent",
                    "border": "transparent"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "",
                    "size": 12,
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 75
                }
            }, {
                "name": "line",
                "tags": "Standard",
                "url": "assets/icon-shapes-hotspot.svg",
                "svg": '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M5,12.4548437 L15.2802734,22.99" id="Line" stroke="#777" stroke-width="2" stroke-linecap="square" sketch:type="MSShapeGroup" transform="translate(10.140137, 17.722422) scale(1, -1) translate(-10.140137, -17.722422) "></path><path d="M17.9302734,12.08 L19.5502734,12.08 L19.5502734,9.32 L22.1902734,9.32 L22.1902734,7.76 L19.5502734,7.76 L19.5502734,5 L17.9302734,5 L17.9302734,7.76 L15.2902734,7.76 L15.2902734,9.32 L17.9302734,9.32 L17.9302734,12.08 Z" id="plus" fill="#777" sketch:type="MSShapeGroup" transform="translate(18.740273, 8.540000) scale(1, -1) translate(-18.740273, -8.540000) "></path></svg>',
                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "#333",
                    "text": "transparent",
                    "border": "transparent"
                },
                "swatchnumber": 1,
                "borderwidth": 1,
                "borderstyle": "solid",

                "padding": 0,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 0,
                    "height": 75
                }
            }],
            "pinned": true,
            "pinnedOrder": 2

        }, {
            "id": 3,
            "lucidgroup": "Flowchart Shapes",
            "groupname": "Flowchart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true,
            "pinnedOrder": 3

        }, {
            "id": 4,
            "lucidgroup": "Flowchart Shapes",
            "groupname": "Containers",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Containers",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Containers",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Containers",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Containers",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Containers",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true,
            "pinnedOrder": 4

        }, {
            "id": 5,
            "lucidgroup": "Geometric Shapes",
            "groupname": "Shapes",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true,
            "pinnedOrder": 5

        }, {
            "id": 6,
            "lucidgroup": "Android Mockups",
            "groupname": "Android Devices",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }]
        }, {
            "id": 61,
            "lucidgroup": "Android Mockups",
            "groupname": "Android Dialogs",
            "shapes": [{
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }]
        }, {
            "id": 62,
            "lucidgroup": "Android Mockups",
            "groupname": "Android Blocks",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
        }, {
            "id": 63,
            "lucidgroup": "Android Mockups",
            "groupname": "Android Inputs",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
        }, {
            "id": 64,
            "lucidgroup": "Android Mockups",
            "groupname": "Android Icons",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
        }, {
            "id": 7,
            "lucidgroup": "Entity Relationship",
            "groupname": "Entity Relationship",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 8,
            "lucidgroup": "iOS Mockups",
            "groupname": "iOS Devices",
            "shapes": [{
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }]
        }, {
            "id": 81,
            "lucidgroup": "iOS Mockups",
            "groupname": "iPhone Elements",
            "shapes": [{
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }]
        }, {
            "id": 82,
            "lucidgroup": "iOS Mockups",
            "groupname": "iPad Elements",
            "shapes": [{
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }]
        }, {
            "id": 83,
            "lucidgroup": "iOS Mockups",
            "groupname": "Common iOS Elements",
            "shapes": [{
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }]
        }, {
            "id": 84,
            "lucidgroup": "iOS Mockups",
            "groupname": "iOS Icons",
            "shapes": [{
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }]
        }, {
            "id": 85,
            "lucidgroup": "iOS Mockups",
            "groupname": "iOS Devices",
            "shapes": [{
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
            "pinned": false
        }, {
            "id": 9,
            "lucidgroup": "Site Maps",
            "groupname": "Site Maps",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }],
            "pinned": false
        }, {
            "id": 10,
            "lucidgroup": "UI Mockups",
            "groupname": "UI Containers",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }]
        }, {
            "id": 101,
            "lucidgroup": "UI Mockups",
            "groupname": "UI Widgets",
            "shapes": [{
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }]
        }, {
            "id": 102,
            "lucidgroup": "UI Mockups",
            "groupname": "UI Input",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }]
        }, {
            "id": 103,
            "lucidgroup": "UI Mockups",
            "groupname": "UI Menus",
            "shapes": [{
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }]
        }, {
            "id": 104,
            "lucidgroup": "UI Mockups",
            "groupname": "UI Misc",
            "shapes": [{
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 11,
            "lucidgroup": "UML",
            "groupname": "UML Class Dgm",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }],
            "pinned": false

        }, {
            "id": 110,
            "lucidgroup": "UML",
            "groupname": "UML Use Case",
            "shapes": [{
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 111,
            "lucidgroup": "UML",
            "groupname": "UML State/Activity",
            "shapes": [{
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 112,
            "lucidgroup": "UML",
            "groupname": "UML Sequence",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 113,
            "lucidgroup": "UML",
            "groupname": "UML Component",
            "shapes": [{
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 114,
            "lucidgroup": "UML",
            "groupname": "UML Deployment",
            "shapes": [{
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 116,
            "lucidgroup": "UML",
            "groupname": "UML Entity Relationship",
            "shapes": [{
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 12,
            "groupname": "BPMN 2.0",
            "shapes": [{
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 13,
            "groupname": "Data Flow",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 14,
            "groupname": "Org Charts",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 15,
            "groupname": "Tables",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 16,
            "groupname": "Value Stream",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 17,
            "groupname": "AWS Architecture",
            "shapes": [{
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 18,
            "groupname": "Azure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 19,
            "groupname": "Cisco Network Icons",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 20,
            "groupname": "Network Infrastructure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 21,
            "groupname": "Server Rack Diagrams",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 22,
            "groupname": "Tech Clipart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 23,
            "groupname": "User Images",
            "shapes": [{
                "name": "Rectangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 24,
            "groupname": "Circuit Diagrams",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 25,
            "groupname": "Enterprise Integration",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 26,
            "groupname": "Equations",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 27,
            "groupname": "Floor Plans",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 28,
            "groupname": "Mind Mapping",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 29,
            "groupname": "Process Engineering",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 30,
            "groupname": "Venn Diagrams",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }];
        var pinnedShapes = [];
        var customShapes = [{
            "id": 1,
            "groupname": "My Saved Shapes",
            "shapes": [],
            "custom": 'custom',
            "pinned": true,
            "pinnedOrder": 1
        }];
        return {
            lucidShapeGroups: function() {
                return lucidShapes;
            },
            customShapeGroups: function() {
                return customShapes;
            },
            pinnedShapeGroups: function() {
                return pinnedShapes;
            }
        };
    }]);

/*global angular, console*/

//include Components js
// @codekit-prepend "components/shape-manager/shape-manager.js"
// @codekit-prepend "components/pages/pages.js"
// @codekit-prepend "components/pages/pages-data.js"
// @codekit-prepend "components/right-dock/right-dock.js"
// @codekit-prepend "components/optionbar/optionbar.js"
// @codekit-prepend "components/loading-tips/loading-tips.js"
// @codekit-prepend "components/canvas/canvas.js"
// @codekit-prepend "components/shape-manager/shapes-data.js"

angular.module('particleApp', 
    [
        // loaded from particle.golucid.co
        'lucidComponents',
        'ngDraggable', 
        'ngSortable', 
        'dndLists',

        // Codekit prepend
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
            'http://particle.golucid.co/**',
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

