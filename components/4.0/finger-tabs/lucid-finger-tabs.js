angular.module("lucidFingerTabs", ['appConfig'])
    .directive('lucidFingerTabs', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'finger-tabs/lucid-finger-tabs.html',
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
    .directive('lucidFingerTab', ['config', function(config) {
        return {
            restrict: 'E',
            templateUrl: config.componentsURL + 'finger-tabs/lucid-finger-tab.html',
            transclude: true,
            replace: true,
            scope: {
                name: '@name',
                icon: '@icon',
            },
            require: '^lucidFingerTabs',
            link: function(scope, element, attrs, ctrl) {
                scope.selected = attrs.selected === "" || attrs.selected === true;
                ctrl.addTab(scope);
            }
        };
    }]);