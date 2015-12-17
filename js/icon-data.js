angular.module("lucidIcons", [])
    .factory('lucidIconFactory', function() {

        var icons = [{
            "icongroup": "22px Icons",
            "icons": [{
                "name":"icon-alert-circle-22px"
            }, {
                "name":"icon-alert-triangle-22px"
            }, {
                "name":"icon-compass-22px"
            }, {
                "name":"icon-finger-22px"
            }]
        }, {
            "icongroup": "18px Icons",
            "icons": [{
                "name": "icon-chevron-18px"
            }, {
                "name": "icon-gear-18px"
            }, {
                "name": "icon-navigator-18px"
            }, {
                "name": "icon-pencil-18px"
            }, {
                "name": "icon-plus-18px"
            }, {
                "name": "icon-search-18px"
            }, {
                "name": "icon-x-18px"
            }]
        }];
        return icons;
    });