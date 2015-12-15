/*global angular : true fixes codekit error*/
angular.module('lucidProductionFactory', [])
    .factory('lucidProductionFactory', function() {
        var service = [{
            'groupname': 'Components',
            'components': [{
                "title": "Progress Bars",
                "url": "production/progress-bars.html",
                "notification": {
                    "type": "error",
                    "message": "Component needs to be udpated, see Jira ticket.",
                    "ticket": "http://particle.golucid.co/#/components/particles/modal"
                }
            }, {
                "title": "Buttons",
                "url": "production/buttons.html",
                "notification": {
                    "type": "complete",
                    "message": "UX Approved. Use in production."
                }
            }, {
                "title": "Dialog",
                "url": "production/dialog.html",
                "notification": {
                    "type": "error",
                    "message": "Component needs to be updated, see Jira ticket",
                    "ticket": "http://particle.golucid.co/#/components/particles/modal"
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