angular.module("lucidTopTabs", ['appConfig'])
    .directive('lucidTopTabs', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'top-tabs/lucid-top-tabs.html',
            scope: {
                selectedTab: '=?'
            },
            transclude: true,
            controller: ['$scope', function($scope) {
                $scope.tabs = [];

                this.addTab = function(tab) {
                    $scope.tabs.push(tab);
                };

                $scope.$watch('selectedTab', function(newVal) {
                    for (var i = 0; i < $scope.tabs.length; i++) {
                        if (i !== newVal) {
                            $scope.tabs[i].selected = false;
                        } else {
                            $scope.tabs[i].selected = true;
                            //console.log('selected', i);
                        }
                    }
                });
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