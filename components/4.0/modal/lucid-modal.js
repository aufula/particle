angular.module("lucidModal", ['appConfig'])
    .directive('lucidModal', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                showmodal: '=?',
                width: '@',
                height: '@',
                title: '@',
                confirm: '@',
                cancel: '@',
                icon: '@',
                confirmFunction: '&'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'modal/lucid-modal.html',
            controller: ['$scope', function($scope){
                if($scope.confirm){
                    $scope.footerHeight = 49;
                }
                else{
                    $scope.footerHeight = 0;
                }
            }],
            compile: function(el, attrs) {
                if (!attrs.width) {
                    attrs.width = 590;
                }
                if (!attrs.height) {
                    attrs.height = 460;
                }
            }
        };
    }]);