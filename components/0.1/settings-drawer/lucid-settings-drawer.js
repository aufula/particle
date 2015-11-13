angular.module("lucidSettingsDrawer", ['appConfig'])
    .directive('lucidSettingsDrawer', function(config) {
        return {
            restrict: 'E',
            scope: {},
            replace: true,
            templateUrl: config.componentsURL + 'settings-drawer/lucid-settings-drawer.html',
        };
    }); 