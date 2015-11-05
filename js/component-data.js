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
                    "details": "insert URL of icon (should be white)."
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
                }]
            }, {
                "title": "Select Dropdown",
                "componentid": "select",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "options",
                    "type": "Array",
                    "details": "List out the options in an array. ['One', 'Two', 'Three']"
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
                    "details": "If you want an icon put the non selected state icon here."
                }, {
                    "name": "iconselected",
                    "type": "URL",
                    "details": "If you want an icon put the selected state icon here."
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
                    "details": "Title of modal. Shows in the header bar."
                }, {
                    "name": "width",
                    "type": "number",
                    "details": "width of modal."
                }, {
                    "name": "height",
                    "type": "number",
                    "details": "height of modal"
                }, {
                    "name": "confirm",
                    "type": "text",
                    "details": "Text to be displayed inside of confirm button"
                }, {
                    "name": "cancel",
                    "type": "text",
                    "details": "Text to be displayed inside of cancel button"
                }, {
                    "name": "confirm-function",
                    "type": "function",
                    "details": "Function called when user clicks confirm (see page directive for example)."
                }],

            }, {
                "title": "Shape",
                "componentid": "shape",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "shape",
                    "type": "text",
                    "details": "options are: block, container, cylinder, decision, polygon, rectangle, star, terminal, text, triangle"
                }, {
                    "name": "fill",
                    "type": "Hex Value",
                    "details": "Color to fill the shape"
                }, {
                    "name": "strokecolor",
                    "type": "Hex Value",
                    "details": "Color for stroke"
                }, {
                    "name": "textcolor",
                    "type": "Hex Value",
                    "details": "Color for text"
                }, {
                    "name": "width",
                    "type": "number",
                    "details": "width of shape"
                }, {
                    "name": "height",
                    "type": "number",
                    "details": "height of shape"
                }, {
                    "name": "strokewidth",
                    "type": "number",
                    "details": "width of stroke"
                }, {
                    "name": "radius",
                    "type": "number",
                    "details": "radius of shape"
                }],

            }, {
                "title": "Shape Group",
                "componentid": "shape-group",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "name",
                    "type": "text",
                    "details": "Name the Shape Library"
                }, {
                    "name": "shapes",
                    "type": "array",
                    "details": "Insert array of data for shapes. See code for examples."
                }, {
                    "name": "custom",
                    "type": "true",
                    "details": "If custom is true than shapes can be dragged into this library"
                }]
            }, {
                "title": "Context Menu",
                "componentid": "context-menu",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "name",
                    "type": "text",
                    "details": "Name the Shape Library"
                }, {
                    "name": "shapes",
                    "type": "array",
                    "details": "Insert array of data for shapes. See code for examples."
                }, {
                    "name": "custom",
                    "type": "true",
                    "details": "If custom is true than shapes can be dragged into this library"
                }]
            }, {
                "title": "Page",
                "componentid": "page",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "name",
                    "type": "text",
                    "details": "Name the Page"
                }, {
                    "name": "master",
                    "type": "true",
                    "details": "If master is true, displays as master"
                }, {
                    "name": "masterapplied",
                    "type": "true",
                    "details": "If masterapplied is true than displays appropriately"
                }, {
                    "name": "selected",
                    "type": "true",
                    "details": "If selected is true will show selected page state."
                }]
            }, {
                "title": "Pages",
                "componentid": "pages",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "name": "name",
                    "type": "text",
                    "details": "Name the Page"
                }, {
                    "name": "master",
                    "type": "true",
                    "details": "If master is true, displays as master"
                }, {
                    "name": "selected",
                    "type": "true",
                    "details": "If selected is true will show selected page state."
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

            }, {
                "title": "Themes",
                "componentid": "themes",
                "description": "Copy and paste component as is.",

            }, {
                "title": "Text Alignment",
                "componentid": "text-alignment",
                "description": "this component .......",

            }, {
                "title": "Path Style",
                "componentid": "path-style",
                "description": "this component is used in the optionbar, the page color, etc.",

            }, {
                "title": "Border Options",
                "componentid": "border-options",
                "description": "this component is used in the optionbar, the page color, etc.",

            }, {
                "title": "Text Options",
                "componentid": "text-options",
                "description": "this component is used in the optionbar, the page color, etc.",

            }, {
                "title": "Line Options",
                "componentid": "line-options",
                "description": "this component is used in the optionbar, the page color, etc.",

            }, {
                "title": "Position Options",
                "componentid": "position-options",
                "description": "this component is used in the optionbar, the page color, etc.",

            }, {
                "title": "Shadow Options",
                "componentid": "shadow-options",
                "description": "this component is used in the optionbar, the page color, etc.",

            }, {
                "title": "Saved Styles",
                "componentid": "saved-styles",
                "description": "this component is used in the optionbar, the page color, etc.",

            }]
        }, 

        // {
        //     //PROTOTYPE
        //     "groupname": "Prototype",
        //     "groupid": "prototypes",
        //     "components": [{
        //         "title": "Canvas",
        //         "componentid": "canvas",
        //         "description": "Copy and paste component as is.",

        //     }, {
        //         "title": "Shapes Manager",
        //         "componentid": "shapes-manager",
        //         "description": "this component is used in the optionbar, the page color, etc.",
        //     }, {
        //         "title": "Settings Drawer",
        //         "componentid": "settings-drawer",
        //         "description": "this component is used in the optionbar, the page color, etc.",
        //     }]
        // }

        ];
        return service;
    });