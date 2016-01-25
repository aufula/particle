angular.module("lucidTip", ['appConfig'])
    .directive('lucidTip', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                caret: '@',
                width: '@',
                dismiss: '=',
                showTip: '=',
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'tip/lucid-tip.html',
            compile: function(el, attrs) {
                if (!attrs.width) {
                    attrs.width = 268;
                }
                if (!attrs.caret) {
                    attrs.caret = 'left';
                }
            }
        };
    }]);