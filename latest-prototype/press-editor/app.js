/*global angular : true fixes codekit error*/
/*global console : true fixes codekit error*/

angular.module('particleApp', ['lucidComponents', 'pressData', 'ngDraggable', 'ngSortable', 'dndLists', 'ngRoute'])
    .config(function($locationProvider) {
        $locationProvider.html5Mode(true);
    })
    ////////////////
    ////START MAIN CTRL
    ////////////////
    .controller('mainCtrl', function($scope, $timeout, $rootScope, pagesData) {
        $rootScope.selectedBlock = {
            'type': 'document'
        };
        $scope.loading = function() {
            console.log('loading');
            $rootScope.loadingClass = "loading";
            $rootScope.pages = pagesData;
            //$rootScope.pages = [{}];
            $timeout(function() {
                //add loaded class to slide in panels
                $rootScope.loadedClass = 'loaded';
                //wait for loaded transition to end, remove Classes
                console.log('loaded');

                $timeout(function() {
                    $rootScope.loadingClass = '';
                    //$rootScope.loadedClass = '';
                    console.log('finished load');

                }, 2000);
            }, 6000);
        };


        $rootScope.saveDocument = function() {
            $scope.savetext = 'saving...';
            $timeout(function() {
                $scope.savetext = 'saved';
            }, 1000);

        };
    })
    ////////////////
    ////START RIGHT DOCK CTRL
    ////////////////
    .controller('RightDockCtrl', function($scope) {
        $scope.activepanel = 'document';
    })
    ////////////////
    ////START LEFT PANEL CTRL
    ////////////////
    .controller('leftPanelCtrl', function($scope, $rootScope, $timeout) {
        $scope.openTab = 'none';
        $rootScope.setTab = function(name) {

            if (name === $scope.openTab) { // is the tab already open?

                $scope.openTab = "none";
                $scope.leftPanelOpen = false;

            } else {
                $scope.openTab = name; // set the tab
                $scope.leftPanelOpen = true;
                $rootScope.panelOpenLoading = true;
                console.log('panel open');
            }

        };
        $scope.changeTemplates = function(group) {
            $rootScope.currentTemplates = {
                "groupname": group.groupname
            };
            $timeout(function() {
                $rootScope.currentTemplates = group;
            }, 500);

        };
    })
    ////////////////
    ////START TEMPLATE CTRL
    ////////////////
    .controller('templateCtrl', function($scope, $rootScope, $location, pressTemplates) {
        $scope.$watch(function() {
                return $location.hash();
            },
            function(id) {
                $scope.id = id;
            }
        );

        $scope.$watch('id', function(id) {
            if (id) {
                // handle scenario when there's id available
                angular.forEach(pressTemplates, function(category) {
                    angular.forEach(category.groups, function(group) {
                        if (group.groupname === id) {
                            console.log(group.groupname);
                            $rootScope.currentTemplates = group;
                        }
                    });

                });
                $rootScope.setTab('templates');
                return;
            } else {
                $rootScope.currentTemplates = pressTemplates[0].groups[0];
            }
            // handle scenario when there is no id
        });

        $scope.pressTemplates = pressTemplates;

        //console.log($scope.searchResults);

    })
    ////////////////
    ////START PAGES CTRL
    ////////////////
    .controller('PagesCtrl', function($scope, $timeout, $rootScope) {
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
                $rootScope.pageNumber = page.$index;
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
                $rootScope.currentPage = newPage;
            }, 10); //delay so it selects after transition
            $rootScope.saveDocument();
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
            $rootScope.saveDocument();
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
    ////START CANVAS CTRL
    ////////////////
    .controller('canvasCtrl', function($scope, $rootScope) {
        $rootScope.deselectBlock = function() {
            if ($rootScope.selectedBlock) {
                var deselect = JSON.parse(JSON.stringify($rootScope.selectedBlock));
                deselect.table = false;
                $rootScope.selectedBlock = deselect;
                //console.log('deselectBlock');
            }
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

                console.log('shape', item, event.pageX, event.pageY, 'total: ', event);

                $rootScope.currentPage.blocks.push(item);
                $rootScope.selectedBlock = item;

            }

        };
        $scope.onDragSuccess = function(data, event) {
            //console.log(event);
            if (event.x > 54) {
                var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;
                //console.log('drag success', data, event);
                if (data) {
                    if (angular.element(event.event.srcElement).hasClass('lucid-block-comment')) {
                        console.log('comment');
                        return;
                    }
                    data.metrics.x = event.x - canvasX - event.element.centerX;
                    data.metrics.y = event.y - canvasY - event.element.centerY;
                    data.shapepanel = false;
                }
            }
        };
    });