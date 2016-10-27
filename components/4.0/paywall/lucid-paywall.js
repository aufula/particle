angular.module("lucidPaywall", ['appConfig'])
    .directive('lucidPaywall', ['config', function(config) {
        return {
            restrict: 'E',
            scope: {
                showpaywall: '=?',
                title: '@',
                subtitle: '@',
                confirm: '@',
                cancel: '@',
                banner: '@',
                confirmFunction: '&'
            },
            replace: true,
            transclude: true,
            templateUrl: config.componentsURL + 'paywall/lucid-paywall.html',
            compile: function(el, attrs) {
                if (!attrs.banner) {
                    attrs.banner = 'PREMIUM';
                }
            }
        };
    }]);