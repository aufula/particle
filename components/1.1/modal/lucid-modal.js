angular.module("lucidModal", ['appConfig'])
    .directive('lucidModal', function($document, config) {
        return {
            restrict: 'E',
            scope: {
                showmodal: '=',
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
            compile: function(el, attrs) {
                if (!attrs.width) {
                    attrs.width = 590;
                }
                if (!attrs.height) {
                    attrs.height = 460;
                }
            },
            link: function(scope, el) {
                $document.on('click', function(e) {
                    if (el[0].contains(e.target)) {
                        return;
                    } else {
                        scope.showpopover = false;
                        //console.log(scope.showpopup +" hide popup");
                        scope.$apply();
                    }
                });
            }
        };
    });