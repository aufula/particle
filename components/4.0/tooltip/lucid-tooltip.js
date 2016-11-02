angular.module('lucidTooltip', ['appConfig'])
    .directive('tooltip', ['config', '$document', '$compile', '$templateRequest', function(config, $document, $compile, $templateRequest) {
        return {
            restrict: 'A',
            scope: {
                tooltip: '@',
                hotkey: '@',
                popover: '@',
                position: '@'
            },
            link: function(scope, element, attrs) {
                $templateRequest(config.componentsURL + 'tooltip/lucid-tooltip.html').then(function(html) {
                    var template = angular.element(html);

                    var tip = $compile(template)(scope),
                        tipClassName = 'tooltip',
                        tipActiveClassName = 'tooltip-show';

                    scope.tipClass = [tipClassName];

                    if (scope.position) {
                        scope.tipClass.push('tooltip-' + scope.position);
                    } else {
                        scope.tipClass.push('tooltip-bottom');
                    }
                    $document.find('body').append(tip);

                    element.bind('mouseover', function() {
                        //console.log('mouseover el');
                        if (!scope.popover) {
                            tip.addClass(tipActiveClassName);
                        }

                        function getElementOffset(element) {
                            var de = document.documentElement;
                            var box = element[0].getBoundingClientRect();
                            var top = (box.top + window.pageYOffset - de.clientTop);
                            var left = box.left + window.pageXOffset - de.clientLeft;
                            return { top: top, left: left };
                        }
                        //console.log(document.body.scrollTop);
                        var pos = element[0].getBoundingClientRect(),
                            offset = getElementOffset(tip),
                            //tipHeight = tip.outerHeight(),
                            tipHeight = angular.element(element).prop('offsetHeight'),
                            tipWidth = angular.element(tip)[0].getBoundingClientRect().width,
                            elWidth = pos.width || pos.right - pos.left,
                            elHeight = pos.height || pos.bottom - pos.top,
                            tipOffset = 10;

                        if (tip.hasClass('tooltip-right')) {
                            offset.top = pos.top - (tipHeight / 2) + (elHeight / 2) + document.body.scrollTop + 2;
                            offset.left = pos.right + tipOffset;
                        } else if (tip.hasClass('tooltip-left')) {
                            offset.top = pos.top - (tipHeight / 2) + (elHeight / 2) + document.body.scrollTop + 2;
                            offset.left = pos.left - tipWidth - tipOffset;
                        } else if (tip.hasClass('tooltip-bottom')) {
                            offset.top = pos.top + elHeight + tipOffset + document.body.scrollTop;
                            offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
                        } else {
                            offset.top = pos.top - tipHeight - tipOffset + document.body.scrollTop + 5;
                            offset.left = pos.left - (tipWidth / 2) + (elWidth / 2) + 2;
                        }
                        tip.css({ 'top': offset.top + 'px', 'left': offset.left + 'px' });
                    });

                    element.bind('mouseout', function() {
                        tip.removeClass(tipActiveClassName);
                        scope.popover = false;
                        // console.log('mouseout el');
                        //scope.$apply();
                    });
                    attrs.$observe('popover', function() {
                        if (scope.popover === 'true') {
                            tip.removeClass(tipActiveClassName);
                            tip.addClass('tooltip-hide');
                            // console.log('removed');
                        } else {
                            tip.removeClass('tooltip-hide');
                            tip.removeClass(tipActiveClassName);
                            //console.log('remove hide');
                        }
                        //console.log('popover', scope.popover);
                    });
                    tip.bind('mouseover', function() {
                        //console.log('mouseover tip');
                        if (!scope.popover) {
                            tip.addClass(tipActiveClassName);
                        }
                    });
                    element.bind('click', function() {
                        //console.log('clicked el');
                        tip.removeClass(tipActiveClassName);
                        scope.popover = true;
                    });

                    tip.bind('mouseout', function() {
                        // console.log('mouseout tip');
                        tip.removeClass(tipActiveClassName);
                    });
                });
            }
        };
    }]);