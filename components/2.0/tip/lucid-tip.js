angular.module("lucidTip", ['appConfig'])
    .directive('lucidTip', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                caret: '@',
                dismiss: '=',
                showtip: '='
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'tip/lucid-tip.html',
            compile: function(el, attrs) {
                if (!attrs.caret) {
                    attrs.caret = 'left';
                }
            }
        };
    }]);