angular.module("lucidTopTabs", ['appConfig'])
.directive('lucidTopTabs', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'top-tabs/lucid-top-tabs.html',
            scope: { 
            },
            transclude: true,
            controller: ['$scope', function($scope) {
                $scope.tabs = [];

                this.addTab = function(tab) {
                    $scope.tabs.push(tab);
                };

                $scope.selectTab = function(tab) {
                    for (var i = 0; i < $scope.tabs.length; i++) {
                        if (tab.name !== $scope.tabs[i].name) {
                            $scope.tabs[i].selected = false;
                        } else {
                            $scope.tabs[i].selected = true;
                        }
                    }
                };
            }]
        };
    }])
    .directive('lucidTopTab', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'top-tabs/lucid-top-tab.html',
            transclude: true,
            replace: true,
            scope: {
                name: '@name',
            },
            require: '^lucidTopTabs',
            link: function(scope, element, attrs, ctrl) {
                scope.selected = attrs.selected === "" || attrs.selected === true;
                ctrl.addTab(scope);
            }
        };
    }]);