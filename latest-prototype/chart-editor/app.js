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