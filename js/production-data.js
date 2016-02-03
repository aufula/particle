/*global angular : true fixes codekit error*/
angular.module('lucidProductionFactory', [])
    .factory('lucidProductionFactory', function() {
        var service = [{
            'groupname': 'Components',
            'components': [{
                "title": "Progress Bars",
                "url": "production/progress-bars.html",
            }, {
                "title": "Buttons",
                "url": "production/buttons.html",
            }, {
                "title": "Dialog",
                "url": "production/dialog.html",
                "error": {
                    "url": "https://jira.lucidchart.com/browse/CHART-9928",
                    "text":"There are known issues with this component, see Jira."
                }
            }, {
                "title": "well",
                "url": "production/well.html"
            }, {
                "title": "Finger Tabs",
                "url": "production/finger-tabs.html"
            }, {
                "title": "Banners",
                "url": "production/banners.html"
            }, {
                "title": "Search",
                "url": "production/search-bar.html"
            }, {
                "title": "Tables",
                "url": "production/tables.html"
            }]
        }];
        return service;
    });