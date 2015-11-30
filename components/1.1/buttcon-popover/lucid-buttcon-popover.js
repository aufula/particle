angular.module("lucidButtconPopover", ['appConfig'])
    .directive('lucidButtconPopover', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                icon: '@',
                width: '@',
                showpopover: '='
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'buttcon-popover/lucid-buttcon-popover.html',
            // controller: function($scope){
            //     $scope.hide = function(){
            //         showpopover = false;
            //         //console.log('hide from controller');
            //     };
            // }
        };
    });