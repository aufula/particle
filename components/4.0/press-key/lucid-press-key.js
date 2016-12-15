angular.module("keyPressEvents", [])
    //hit escape key
    .directive('pressKey', [function() {
        return function(scope, element, attrs) {
            element.bind('keydown keypress', function(event) {
                console.log('key pressed', event.keyCode, 'wanting key', attrs.key);
                    //13 = enter
                    //27 = esc
                    // use standard character codes http://www.w3schools.com/charsets/ref_html_ascii.asp
                if (event.keyCode === Number(attrs.key)) { // 27 = esc key
                    scope.$apply(function() {
                        scope.$eval(attrs.pressKey);
                    });

                    event.preventDefault();
                }
            });
        };
    }])
    //remove for next version - this is used in prototypes
    .directive('ngEnter', [function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if (event.which === 13) {
                    scope.$apply(function() {
                        scope.$eval(attrs.ngEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    }]);