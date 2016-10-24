/*global angular : true fixes codekit error*/
angular.module('lucidComponentFactory', [])
    .factory('lucidComponentFactory', function() {
        var service = [{
            //Basic Particle Components
            "groupname": "Editor Components",
            "groupid": "particles",
            "components": [{
                "title": "Input",
                "componentid": "input",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "attr": "value",
                    "type": "text",
                    "details": "Initial value of input."
                }, {
                    "attr": "width",
                    "type": "number",
                    "details": "how wide the input should be (includes arrows)."
                }, {
                    "attr": "label",
                    "type": "text",
                    "details": "Optional: if you want a label below the input."
                }, {
                    "attr": "class",
                    "type": "text",
                    "details": "Optional: add 'condensed' for condensed aesthetic."
                }]
            }, {
                "title": "Select Dropdown",
                "componentid": "select",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "attr": "options",
                    "type": "Array",
                    "details": "List out the options in an array. ['One', 'Two', 'Three']"
                }, {
                    "attr": "width",
                    "type": "number",
                    "details": "how wide the dropdown should be, *check when dropdown is open."
                }, {
                    "attr": "label",
                    "type": "text",
                    "details": "Optional: if you want a label below the input."
                }, {
                    "attr": "class",
                    "type": "text",
                    "details": "Optional: add 'condensed' for condensed aesthetic."
                }]

            }, {
                "title": "Input Stepper",
                "componentid": "input-stepper",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "attr": "number",
                    "type": "number",
                    "details": "Initial value of input."
                }, {
                    "attr": "unit",
                    "type": "text",
                    "details": "Insert unit to be placed after number (px, in, pt)"
                }, {
                    "attr": "step",
                    "type": "number",
                    "details": "How much number is increased or decreased when clicking the up/down arrows"
                }, {
                    "attr": "width",
                    "type": "number",
                    "details": "how wide the input should be (includes arrows)."
                }, {
                    "attr": "label",
                    "type": "text",
                    "details": "Optional: if you want a label below the input."
                }, {
                    "attr": "class",
                    "type": "text",
                    "details": "Optional: add 'condensed' for condensed aesthetic."
                }]
            }, {
                "title": "Toggle",
                "componentid": "toggle",
                "description": "On/Off toggle state component used mostly in settings.",
                "inputs": [{
                    "attr": "activetext",
                    "type": "text",
                    "details": "Optional: default is 'ON'"
                }, {
                    "attr": "inactivetext",
                    "type": "text",
                    "details": "Optional: default is 'OFF'"
                }, {
                    "attr": "width",
                    "type": "number",
                    "details": "Optional: used if you have alternate text. "
                }, {
                    "attr": "label",
                    "type": "text",
                    "details": "Optional: add label to bottom of toggle"
                }, {
                    "attr": "toggle",
                    "type": "true/false",
                    "details": "Optional: used to connect to existing variable, or set default on/off state."
                }, {
                    "attr": "class",
                    "type": "'reverse-text'",
                    "details": "Optional: add class of 'reverse-text' to make label text white and darken off state"
                }]
            }, {
                "title": "Edit in Place",
                "componentid": "edit-in-place",
                "description": "double click to edit in place",
                "inputs": [{
                    "attr": "ng-model",
                    "type": "var",
                    "details": "The text that you want to be editable"
                }, {
                    "attr": "placeholder",
                    "type": "text",
                    "details": "Optional: Add placeholder text if input is deleted"
                }, {
                    "attr": "edit",
                    "type": "true/false",
                    "details": "Optional: Edit mode can be toggled using outside variable. e.g. rename shape library from dropdown rather than double click."
                }]
            }, {
                "title": "Buttcon",
                "componentid": "buttcon",
                "description": "Add a label to an icon, example is inside the colorpicker.",
                "inputs": [{
                    "attr": "icon",
                    "type": "URL",
                    "details": "svg will be included inline so you can manipulate colors using css"
                }, {
                    "attr": "label",
                    "type": "text",
                    "details": "Optional: add label to bottom of toggle"
                }, {
                    "attr": "active",
                    "type": "true/false",
                    "details": "Optional: if true, 'active' class is added to color icon lucid blue. Note: complex icons will need custom css"
                }, {
                    "attr": "class",
                    "type": "text",
                    "details": "Optional: add 'condensed' for condensed aesthetic. Note: should be 14px icon if condensed."
                }]
            }, {
                "title": "Collapse Bar",
                "componentid": "collapse-bar",
                "description": "Used to separate data and settings",
                "inputs": [{
                    "attr": "title",
                    "type": "text",
                    "details": "Name the top bar"
                }, {
                    "attr": "closed",
                    "type": "true/false",
                    "details": "Optional: Set to true want the element closed by default"
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
                    "attr": "icon",
                    "type": "URL",
                    "details": "Insert the URL of the icon you want to be clickable."
                }, {
                    "attr": "width",
                    "type": "number",
                    "details": "Set the width of the popover menu. The height is determined by the content"
                }, {
                    "attr": "class",
                    "type": "text",
                    "details": "Optional: add 'popover-list' for a popover dropdown list - see example."
                }, {
                    "attr": "showpopover",
                    "type": "var",
                    "details": "Optional: Assign variable to show/hide popover from another source."
                }],
                "livelink": "http://www.lucidchart.com"
            }, {
                "title": "Context Menu",
                "componentid": "context-menu",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "attr": "lucid-context-menu",
                    "type": "",
                    "details": "Include this on any element to add a right click context menu."
                }, {
                    "attr": "data-target",
                    "type": "ID",
                    "details": "Insert ID of context menu, that will show up when right clicked."
                }]
            }, {
                "title": "More Drawer",
                "componentid": "more-drawer",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "attr": "height",
                    "type": "number",
                    "details": "Insert the height the drawer should open."
                }, {
                    "attr": "tophandle",
                    "type": "true",
                    "details": "If true, drawer will open upwards. Only tested on a fixed bottom position."
                }]

            }]
        }, {
            //Basic Particle Components
            "groupname": "Content Components",
            "groupid": "components",
            "components": [{
                "title": "Buttons",
                "componentid": "button",
                "description": "Buttons can be created by adding a class",
                "inputs": [{
                    "attr": "color",
                    "type": "text",
                    "details": "colors available: blue, red, green, yellow, grey"
                }, {
                    "attr": "icon",
                    "type": "URL",
                    "details": "insert URL of icon (should be white)."
                }]
            }, {
                "title": "Finger Tabs",
                "componentid": "finger-tabs",
                "description": "this component is used in modals and the user settings page",
                "inputs": [{
                    "attr": "name",
                    "type": "text",
                    "details": "Create a name for the finger tab."
                }, {
                    "attr": "icon",
                    "type": "URL",
                    "details": "Optional: Insert URL of icon. Coloring SVG is added through css"
                }, {
                    "attr": "selected-tab",
                    "type": "variable",
                    "details": "*Optional: link the current selected tab to another variable"
                }],
            }, {
                "title": "Top Tabs",
                "componentid": "top-tabs",
                "description": "this component is used in press, the page color, etc.",
                "inputs": [{
                    "attr": "name",
                    "type": "text",
                    "details": "Create a name for the finger tab."
                }, {
                    "attr": "selected-tab",
                    "type": "variable",
                    "details": "*Optional: link the current selected tab to another variable"
                }],
            }, {
                "title": "Notifications",
                "componentid": "notification",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "attr": "type",
                    "type": "text",
                    "details": "options are: information, complete, error, alert"
                }, {
                    "attr": "button",
                    "type": "text",
                    "details": "insert the text for the button. If blank, there won't be a button"
                }],

            }, {
                "title": "Progress Stepper",
                "componentid": "progress-stepper",
                "description": "this component is used in modals and the user settings page",
                "inputs": [{
                    "attr": "name",
                    "type": "text",
                    "details": "Create a name for the finger tab."
                }, {
                    "attr": "selected-step",
                    "type": "variable",
                    "details": "*Optional: link the current selected step to another variable"
                }],
            }]
        }, {
            //Basic Particle Components
            "groupname": "Modals",
            "groupid": "modals",
            "components": [{
                "title": "Modal",
                "componentid": "modal",
                "description": "this component is used in the optionbar, the page color, etc.",
                "inputs": [{
                    "attr": "showmodal",
                    "type": "variable",
                    "details": "Insert a variable, when variable is true, modal will show."
                }, {
                    "attr": "title",
                    "type": "text",
                    "details": "Title of modal."
                }, {
                    "attr": "width",
                    "type": "number",
                    "details": "Width of modal content."
                }, {
                    "attr": "height",
                    "type": "number",
                    "details": "Height of modal content."
                }, {
                    "attr": "confirm",
                    "type": "text",
                    "details": "Text to be displayed inside of confirm button, if empty footer won't show"
                }, {
                    "attr": "cancel",
                    "type": "text",
                    "details": "Text to be displayed inside of cancel button"
                }, {
                    "attr": "confirm-function",
                    "type": "function",
                    "details": "Function called when user clicks confirm."
                }],

            }, {
                "title": "Paywall",
                "componentid": "paywall",
                "description": "Paywalls are used throughout the product to encourage payment",
                "inputs": [{
                    "attr": "showpaywall",
                    "type": "var",
                    "details": "when true, paywall will show."
                }, {
                    "attr": "banner",
                    "type": "text",
                    "details": "Text that shows up in the top left orange banner."
                }, {
                    "attr": "title",
                    "type": "text",
                    "details": "Title of paywall."
                }, {
                    "attr": "subtitle",
                    "type": "text",
                    "details": "*Optional: subtitle of paywall."
                }, {
                    "attr": "confirm",
                    "type": "text",
                    "details": "Text of confirm button."
                }, {
                    "attr": "confirm-function",
                    "type": "function",
                    "details": "*Optional: Function called when button is clicked."
                }]
            }]
        }, {
            //Toolbar Components
            "groupname": "User Education",
            "groupid": "user-education",
            "components": [{
                "title": "Onboarding Tip",
                "componentid": "tip",
                "description": "tips show up to show how to use the product, tips are quick introductions, to point out features",
                "inputs": [{
                    "attr": "showtip",
                    "type": "var",
                    "details": "when true, tip will show. If they have dismissed it, it will no longer show up."
                }, {
                    "attr": "dismiss",
                    "type": "var",
                    "details": "Set to true to dismiss tip. Once a user has dismissed the tip, it won't return"
                }, {
                    "attr": "caret",
                    "type": "text",
                    "details": "*Options: top, left, bottom, right. Adds appropriate caret and transition"
                }, {
                    "attr": "style",
                    "type": "text",
                    "details": "Set position with inline style or css."
                }]
            }, ]
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