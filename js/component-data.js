/*global angular : true fixes codekit error*/
angular.module('lucidComponentFactory', [])
    .factory('lucidComponentFactory', function() {
        var service = [{
            //Basic Particle Components
            "groupname": "Particles",
            "groupid": "particles",
            "components": [{
                "title": "Buttons",
                "componentid": "button",
                "description": "Buttons can be created by adding a class",
                "inputs": [{
                    "name": "color",
                    "type": "text",
                    "details": "colors available: blue, red, green, yellow, grey"
                }, {
                    "name": "icon",
                    "type": "URL",
                    "details": "insert URL of icon you'd like to use (should be white)."
                }]
            }, {
                "title": "Input Stepper",
                "componentid": "input-stepper",
                "description": "this component is used in the optionbar, the page color, etc. explain more..."
            }, {
                "title": "Select Dropdown",
                "componentid": "select",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",
                "inputs": [{
                    "name": "options",
                    "type": "Array",
                    "details": "List out the options in an array. ['One', 'Two', 'Three']"
                }],

            }, {
                "title": "Icon",
                "componentid": "icon",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Buttcon Popover",
                "componentid": "buttcon-popover",
                "description": "Copy and paste component as is.",
                "inputs": [{
                    "name": "icon",
                    "type": "URL",
                    "details": "Insert the URL of the icon you want to be clickable."
                }, {
                    "name": "width",
                    "type": "number",
                    "details": "Set the width of the popover menu. The height is determined by the content"
                }],
                "livelink": "http://www.lucidchart.com"
            }, {
                "title": "More Drawer",
                "componentid": "more-drawer",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Notifications",
                "componentid": "notification",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",
                "inputs": [{
                    "name": "type",
                    "type": "text",
                    "details": "options are: information, complete, error, alert"
                }],

            }, {
                "title": "Finger Tabs",
                "componentid": "finger-tabs",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Modal",
                "componentid": "modal",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Shape",
                "componentid": "shape",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Shape Library",
                "componentid": "shape-library",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }]
        }, {
            //Toolbar Components
            "groupname": "Toolbar Components",
            "groupid": "toolbar",
            "components": [{
                "title": "Color Picker",
                "componentid": "color-picker",
                "description": "Copy and paste component as is.",

            }, {
                "title": "Text Alignment",
                "componentid": "text-alignment",
                "description": "this component .......",

            }, {
                "title": "Path Style",
                "componentid": "path-style",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Border Options",
                "componentid": "border-options",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Text Options",
                "componentid": "text-options",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Line Options",
                "componentid": "line-options",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Position Options",
                "componentid": "position-options",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }, {
                "title": "Shadow Options",
                "componentid": "shadow-options",
                "description": "this component is used in the optionbar, the page color, etc. explain more...",

            }]
        }, {
            //form components
            "groupname": "Forms",
            "groupid": "forms",
            "components": []
        }];
        return service;
    });