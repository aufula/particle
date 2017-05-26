/*global angular : true fixes codekit error*/
angular.module("lucidSnippets", [])
    .factory('lucidSnippets', function() {

        var snippets = [{
            'title': 'Show Panels: ng-click',
            'codepen': 'https://codepen.io/corysmc/embed/ZbXeMq/?height=350&theme-id=19963&default-tab=result',
            'description': 'The easiest way to add an interaction is by assigning a variable when someone clicks on an element. This can be done using "ng-click." In the demo below we set the variable {{hideleft}}  and {{hideright}} to true or false.',
            'starterfile' : 'https://codepen.io/corysmc/pen/XmzvQP'
        }, {
            'title': 'Show Panels: ng-hide',
            'codepen': 'https://codepen.io/corysmc/embed/GpMWXj/?height=350&theme-id=19963&default-tab=result',
            'description': 'We can now easily hide the panels by adding ng-hide to the elements we want to hide. When ng-hide is true, angular will hide the element. Because our variables are not set, the elements will show by default.'
        }, {
            'title': 'Show Panels: ng-animate',
            'codepen': 'https://codepen.io/corysmc/embed/PPJbGE/?height=350&theme-id=19963&default-tab=result',
            'description': 'We have elements showing and hiding, angular makes it very easy to add a transition when you show and hide an element. In our css we need to add .ng-hide and .ng-animate to the element we are hiding. See code below for examples.'
        }, {
            'title': 'Show Panels: ng-class',
            'codepen': 'https://codepen.io/corysmc/embed/RWLpeR/?height=350&theme-id=19963&default-tab=result',
            'description': 'Great! We have transitions for our sliding panels, but our show/hide toggle needs to show which toggle is currently active. We can do this using ng-class. First put the class you want to add, then put the condition that must be true for the class to be added. See code for example.'
        }, {
            'title': 'Select Dropdown: ng-click',
            'codepen': 'https://codepen.io/corysmc/embed/BjrNmx/?height=350&theme-id=19963&default-tab=result',
            'description': 'The easiest way to add an interaction is by assigning a variable when someone clicks on an element. This can be done using "ng-click." In the demo below we set the variable {{selectedFont}} to the font that is clicked. Notice that no font will is selected until someone clicks. See the next step ng-init to set the default font',
            'starterfile': 'https://codepen.io/corysmc/pen/YyYKqy'
        }, {
            'title': 'Select Dropdown: ng-init',
            'codepen': 'https://codepen.io/corysmc/embed/avyYpE/?height=350&theme-id=19963&default-tab=result',
            'description': 'Set ng-init to assign an initial state to the variable {{selectedFont}}.'
        }, {
            'title': 'Select Dropdown: ng-show',
            'codepen': 'https://codepen.io/corysmc/embed/JYyLyv/?height=350&theme-id=19963&default-tab=result',
            'description': 'ng-show will show an element if the assigned value is true, and it will hide the block if it\'s value is false. Using ng-click we can assign this variable when a user clicks another element. The "!" means \'not\' in code, this allows us to toggle between true and false (show and hide).'
        }, {
            'title': 'Select Dropdown: ng-class',
            'codepen': 'https://codepen.io/corysmc/embed/meMxBY/?height=350&theme-id=19963&default-tab=result',
            'description': 'In our dropdown example we want to show which font is selected. We can do that by adding a class to the current {{selectedFont}}. Using ng-class we can add a class dependent on our {{selectedFont}} variable. See code for example.'
        }, {
            'title': 'Select Dropdown: ng-repeat',
            'codepen': 'https://codepen.io/corysmc/embed/vNJRWP/?height=350&theme-id=19963&default-tab=result',
            'description': 'You\'ll notice we have a lot of repeated html and angular expressions in our examples above. Anytime you are repeating html ask yourself if ng-repeat can be used. This makes it very easy to add a font to our list without having to recode anything. NOTE: when using ng-repeat in order to assign a variable outside the repeat you need to use $parent.selectedFont.'
        }];
        return snippets;
    });