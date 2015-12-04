/*global angular : true fixes codekit error*/
angular.module('lucidComponentFactory', [])
    .factory('lucidComponentFactory', function() {
        var service = [{
            //Basic Particle Components
            "groupname": "Particles",
            "groupid": "particles",
            "components": [{
                "title": "Input",
                "componentid": "input",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "value",
                    "type": "text",
                    "details": "Initial value of input."
                }, {
                    "name": "width",
                    "type": "number",
                    "details": "how wide the input should be (includes arrows)."
                }, {
                    "name": "label",
                    "type": "text",
                    "details": "Optional: if you want a label below the input."
                }, {
                    "name": "class",
                    "type": "text",
                    "details": "Optional: add 'condensed' for condensed aesthetic."
                }]
            }, {
                "title": "Input Stepper",
                "componentid": "input-stepper",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "number",
                    "type": "number",
                    "details": "Initial value of input."
                }, {
                    "name": "unit",
                    "type": "text",
                    "details": "Insert unit to be placed after number (px, in, pt)"
                }, {
                    "name": "step",
                    "type": "number",
                    "details": "How much number is increased or decreased when clicking the up/down arrows"
                }, {
                    "name": "width",
                    "type": "number",
                    "details": "how wide the input should be (includes arrows)."
                }, {
                    "name": "label",
                    "type": "text",
                    "details": "Optional: if you want a label below the input."
                }, {
                    "name": "class",
                    "type": "text",
                    "details": "Optional: add 'condensed' for condensed aesthetic."
                }]
            }, {
                "title": "Select Dropdown",
                "componentid": "select",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "options",
                    "type": "Array",
                    "details": "List out the options in an array. ['One', 'Two', 'Three']"
                }, {
                    "name": "width",
                    "type": "number",
                    "details": "how wide the dropdown should be, *check when dropdown is open."
                }, {
                    "name": "label",
                    "type": "text",
                    "details": "Optional: if you want a label below the input."
                }, {
                    "name": "class",
                    "type": "text",
                    "details": "Optional: add 'condensed' for condensed aesthetic."
                }]

            }, {
                "title": "Toggle",
                "componentid": "toggle",
                "description": "On/Off toggle state component used mostly in settings.",
                "inputs": [{
                    "name": "activetext",
                    "type": "text",
                    "details": "Optional: default is 'ON'"
                }, {
                    "name": "inactivetext",
                    "type": "text",
                    "details": "Optional: default is 'OFF'"
                }, {
                    "name": "width",
                    "type": "number",
                    "details": "Optional: used if you have alternate text. "
                }, {
                    "name": "label",
                    "type": "text",
                    "details": "Optional: add label to bottom of toggle"
                }, {
                    "name": "toggle",
                    "type": "var",
                    "details": "Optional: used to connect to existing variable."
                }]
            }, {
                "title": "Buttcon",
                "componentid": "buttcon",
                "description": "Add a label to an icon, example is inside the colorpicker.",
                "inputs": [{
                    "name": "icon",
                    "type": "URL",
                    "details": "svg will be included inline so you can manipulate colors using css"
                }, {
                    "name": "label",
                    "type": "text",
                    "details": "Optional: add label to bottom of toggle"
                }, {
                    "name": "class",
                    "type": "text",
                    "details": "Optional: add 'active' class to color icon lucid blue"
                }]
            }, {
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
                    "details": "insert URL of icon (should be white)."
                }]
            }, {
                "title": "Icon",
                "componentid": "icon",
                "description": "this component is used in the optionbar, the page color, etc.",

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
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "height",
                    "type": "number",
                    "details": "Insert the height the drawer should open."
                }, {
                    "name": "options",
                    "type": "Array",
                    "details": "List out the options in an array. ['One', 'Two', 'Three']"
                }, {
                    "name": "tophandle",
                    "type": "true",
                    "details": "If true, drawer will open upwards. Only tested on a fixed bottom position."
                }]

            }, {
                "title": "Notifications",
                "componentid": "notification",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "type",
                    "type": "text",
                    "details": "options are: information, complete, error, alert"
                }, {
                    "name": "button",
                    "type": "text",
                    "details": "insert the text for the button. If blank, there won't be a button"
                }],

            }, {
                "title": "Finger Tabs",
                "componentid": "finger-tabs",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "name",
                    "type": "text",
                    "details": "Create a name for the finger tab."
                }, {
                    "name": "icon",
                    "type": "URL",
                    "details": "Optional: Insert URL of icon. Coloring SVG is added through css"
                }],
            }, {
                "title": "Modal",
                "componentid": "modal",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "showmodal",
                    "type": "variable",
                    "details": "Insert a variable, when variable is true, modal will show."
                }, {
                    "name": "title",
                    "type": "text",
                    "details": "Title of modal."
                }, {
                    "name": "width",
                    "type": "number",
                    "details": "Width of modal."
                }, {
                    "name": "height",
                    "type": "number",
                    "details": "Height of modal"
                }, {
                    "name": "confirm",
                    "type": "text",
                    "details": "Text to be displayed inside of confirm button, if empty footer won't show"
                }, {
                    "name": "cancel",
                    "type": "text",
                    "details": "Text to be displayed inside of cancel button"
                }, {
                    "name": "confirm-function",
                    "type": "function",
                    "details": "Function called when user clicks confirm."
                }],

            }, {
                "title": "Context Menu",
                "componentid": "context-menu",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "data-target",
                    "type": "ID",
                    "details": "Insert ID of context menu, that will show up when right clicked."
                }]
            }, {
                "title": "Collapse Bar",
                "componentid": "collapse-bar",
                "description": "Used to separate data and settings",
                "inputs": [{
                    "name": "title",
                    "type": "text",
                    "details": "Name the top bar"
                }, {
                    "name": "collapsible",
                    "type": "true/false",
                    "details": "Optional: Set to false if you do not want element to collapse"
                }]
            }]
        }, {
            //Toolbar Components
            "groupname": "Toolbar Components",
            "groupid": "toolbar",
            "components": [{
                "title": "Color Picker",
                "componentid": "color-picker",
                "description": "Copy and paste component as is.",

            }]
        }];
        return service;
    });