angular.module("appConfig",[]).config(["$sceDelegateProvider",function(e){e.resourceUrlWhitelist(["self","http://particle.golucid.co/components/**","https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/**"])}]).constant("config",{componentsURL:"http://particle.golucid.co/components/4.0/"}),angular.module("lucidComponents",["ngAnimate","appConfig","lucidInputStepper","lucidButtconPopover","lucidColorPicker","lucidMoreDrawer","lucidModal","lucidFingerTabs","lucidButtcon","lucidNotification","lucidSelect","lucidInput","lucidButton","lucidCollapseBar","lucidContextMenu","lucidToggle","editInPlace","lucidTopTabs","lucidTip","lucidPaywall","lucidProgressStepper","lucidButtonDropdown","lucidSearch","lucidSlider","lucidGrowl","dynamicHeightHide","lucidTooltip","clickOutside","ngRightClick","keyPressEvents"]).directive("selectOnLoad",["$timeout",function(e){return{restrict:"A",link:function(t,n){e(function(){n[0].select()})}}}]).filter("sanitize",["$sce",function(e){return function(t){return e.trustAsHtml(t)}}]),angular.module("lucidInput",["appConfig"]).directive("lucidInput",["config",function(e){return{restrict:"AE",scope:{unit:"@",value:"=?ngModel",width:"@",label:"@",placeholder:"@",disabled:"@"},replace:!0,templateUrl:e.componentsURL+"input/lucid-input.html"}}]),angular.module("lucidInputStepper",["appConfig"]).directive("lucidInputStepper",["config",function(e){return{restrict:"AE",scope:{unit:"@",step:"@",number:"=?ngModel",width:"@",label:"@"},replace:!0,templateUrl:e.componentsURL+"input-stepper/lucid-input-stepper.html",controller:["$scope","$interval",function(e,t){var n=null;e.$watch("number + unit",function(){"%"!==e.unit?e.stepperinput=e.number+" "+e.unit:e.stepperinput=e.number+e.unit}),e.removeText=function(){var t=e.stepperinput;e.number=t.replace(/[^0-9.]/g,"")},e.updateInput=function(){e.removeText(),e.number=Number(e.number)},e.stepUp=function(){e.removeText(),e.number=Number(e.number)+Number(e.step),n=t(function(){e.removeText(),e.number=Number(e.number)+Number(e.step)},100)},e.stepDown=function(){e.removeText(),e.number<1||(e.number=Number(e.number)+Number(-e.step),n=t(function(){e.removeText(),e.number<1||(e.number=Number(e.number)+Number(-e.step))},100))},e.mouseUp=function(){n&&t.cancel(n)}}],compile:function(e,t){t.step||(t.step=1),t.unit||(t.unit=""),t.number||(t.number="0")}}}]),angular.module("lucidColorPicker",["appConfig"]).directive("lucidColorPicker",["config",function(e){return{restrict:"E",scope:{selected:"=?"},replace:!1,templateUrl:e.componentsURL+"color-picker/lucid-color-picker.html",controller:["$scope",function(e){e.swatchpanel="Fill",e.showColorDrawer=!1}]}}]).directive("lucidColorPickerOptions",["config",function(e){return{restrict:"E",scope:{color:"="},templateUrl:e.componentsURL+"color-picker/lucid-color-picker-options.html",controller:["$scope",function(e){e.lucidcolorpickergrayscale=[{hex:"#FFFFFF"},{hex:"#E5E5E5"},{hex:"#CCCCCC"},{hex:"#B2B2B2"},{hex:"#999999"},{hex:"#666666"},{hex:"#333333"},{hex:"#000000"}],e.lucidcolorpickercolors=[{hex:"#d1bcd2"},{hex:"#f9d2de"},{hex:"#ffbbb1"},{hex:"#ffdba9"},{hex:"#ffeca9"},{hex:"#c7e8ac"},{hex:"#99d5ca"},{hex:"#c1e4f7"},{hex:"#b2d6ef"},{hex:"#b391b5"},{hex:"#f5b5c8"},{hex:"#ff8f80"},{hex:"#ffc374"},{hex:"#ffdf71"},{hex:"#a3d977"},{hex:"#5abaa7"},{hex:"#99d2f2"},{hex:"#83bbe5"},{hex:"#834187"},{hex:"#de5f85"},{hex:"#c92d39"},{hex:"#ef8d22"},{hex:"#fcc438"},{hex:"#7ab648"},{hex:"#19967d"},{hex:"#3aa6dd"},{hex:"#0c7cba"}]}]}}]),angular.module("lucidMoreDrawer",["appConfig"]).directive("lucidMoreDrawer",["config",function(e){return{restrict:"E",scope:{showdrawer:"=?",height:"@",tophandle:"@",more:"@",less:"@"},replace:!0,transclude:!0,templateUrl:e.componentsURL+"more-drawer/lucid-more-drawer.html",compile:function(e,t){t.more||(t.more="More"),t.less||(t.less="Less")}}}]),angular.module("lucidModal",["appConfig"]).directive("lucidModal",["config",function(e){return{restrict:"E",scope:{showmodal:"=?",width:"@",height:"@",title:"@",confirm:"@",cancel:"@",icon:"@",confirmFunction:"&"},replace:!0,transclude:!0,templateUrl:e.componentsURL+"modal/lucid-modal.html",controller:["$scope",function(e){e.confirm?e.footerHeight=49:e.footerHeight=0}],compile:function(e,t){t.width||(t.width=590),t.height||(t.height=460)}}}]),angular.module("lucidFingerTabs",["appConfig"]).directive("lucidFingerTabs",["config",function(e){return{restrict:"E",templateUrl:e.componentsURL+"finger-tabs/lucid-finger-tabs.html",scope:{selectedTab:"=?"},transclude:!0,controller:["$scope",function(e){e.tabs=[],this.addTab=function(t){e.tabs.push(t)},e.$watch("selectedTab",function(t){for(var n=0;n<e.tabs.length;n++)n!==t?e.tabs[n].selected=!1:e.tabs[n].selected=!0})}]}}]).directive("lucidFingerTab",["config",function(e){return{restrict:"E",templateUrl:e.componentsURL+"finger-tabs/lucid-finger-tab.html",transclude:!0,replace:!0,scope:{name:"@name",icon:"@icon"},require:"^lucidFingerTabs",link:function(e,t,n,i){e.selected=""===n.selected||n.selected===!0,i.addTab(e)}}}]),angular.module("lucidButtconPopover",["appConfig"]).directive("lucidButtconPopover",["config",function(e){return{restrict:"E",scope:{icon:"@",width:"@",showpopover:"=?"},replace:!0,transclude:!0,templateUrl:e.componentsURL+"buttcon-popover/lucid-buttcon-popover.html"}}]),angular.module("lucidCollapseBar",["appConfig"]).directive("lucidCollapseBar",["config",function(e){return{restrict:"E",scope:{title:"@",closed:"@"},replace:!0,transclude:!0,templateUrl:e.componentsURL+"collapse-bar/lucid-collapse-bar.html"}}]).animation(".lucid-collapse-bar-content",["$animateCss",function(e){function t(e){var t=e[0].getAttribute("data-slide-toggle");return t||(t=++o,e[0].setAttribute("data-slide-toggle",t)),t}function n(e){var t=c[e];return t||(t={},c[e]=t),t}function i(e,t,n,i,o){return function(){t.animating=!0,t.animator=n,t.doneFn=o,n.start().finally(function(){e&&t.doneFn===o&&(i[0].style.height=""),e||t.doneFn!==o||(i[0].style.height=""),t.animating=!1,t.animator=void 0,t.doneFn()})}}var o=0,c={};return{addClass:function(o,c,l){if("ng-hide"===c){var r=n(t(o)),u=r.animating&&r.height?r.height:o[0].offsetHeight,a=e(o,{from:{height:u+"px",opacity:1},to:{height:"0px",opacity:0}});if(a)return r.animating?(r.doneFn=i(!0,r,a,o,l),r.animator.end()):(r.height=u,i(!0,r,a,o,l)())}l()},removeClass:function(o,c,l){if("ng-hide"===c){var r=n(t(o)),u=r.animating&&r.height?r.height:o[0].offsetHeight,a=e(o,{from:{height:"0px",opacity:0},to:{height:u+"px",opacity:1}});if(a)return r.animating?(r.doneFn=i(!1,r,a,o,l),r.animator.end()):(r.height=u,i(!1,r,a,o,l)())}l()}}}]),angular.module("lucidButtcon",["appConfig"]).directive("lucidButtcon",["config",function(e){return{restrict:"E",scope:{icon:"@",label:"@",active:"@",badge:"@"},replace:!0,templateUrl:e.componentsURL+"buttcon/lucid-buttcon.html"}}]),angular.module("lucidNotification",["appConfig"]).directive("lucidNotification",["config",function(e){return{restrict:"E",scope:{type:"@",button:"@"},replace:!0,transclude:!0,templateUrl:e.componentsURL+"notification/lucid-notification.html"}}]),angular.module("lucidSelect",["appConfig"]).directive("lucidSelect",["config",function(e){return{restrict:"E",scope:{selectedOption:"=?ngModel",options:"=?",width:"@",label:"@"},transclude:!0,templateUrl:e.componentsURL+"select/lucid-select.html",controller:["$scope",function(e){e.selectedOption||(e.selectedOption=e.options[0])}]}}]),angular.module("lucidButton",["appConfig"]).directive("lucidButton",["config",function(e){return{restrict:"E",scope:{icon:"@",color:"@",text:"@"},replace:!0,transclude:!0,templateUrl:e.componentsURL+"button/lucid-button.html"}}]),angular.module("lucidContextMenu",["appConfig"]).factory("ContextMenuService",[function(){return{element:null,menuElement:null}}]).directive("lucidContextMenu",["$document","ContextMenuService",function(e,t){return{restrict:"A",scope:{callback:"&lucidContextMenu",disabled:"&contextMenuDisabled",closeCallback:"&lucidContextMenuClose"},link:function(n,i,o){function c(t,n){n.removeClass("ng-hide");var i=e[0].documentElement,o=(window.pageXOffset||i.scrollLeft)-(i.clientLeft||0),c=(window.pageYOffset||i.scrollTop)-(i.clientTop||0),l=n[0].scrollWidth,r=n[0].scrollHeight,u=i.clientWidth+o,p=i.clientHeight+c,d=l+t.pageX,s=r+t.pageY,f=Math.max(t.pageX-o,0),m=Math.max(t.pageY-c,0);d>u&&(f-=d-u),s>p&&(m-=s-p),n.css("top",m+"px"),n.css("left",f+"px"),a=!0}function l(e){e.addClass("ng-hide"),a&&n.closeCallback(),a=!1}function r(e){!n.disabled()&&a&&27===e.keyCode&&n.$apply(function(){l(t.menuElement)})}function u(e){n.disabled()||!a||2===e.button&&e.target===t.element||n.$apply(function(){l(t.menuElement)})}var a=!1;i.bind("contextmenu",function(e){n.disabled()||(null!==t.menuElement&&l(t.menuElement),t.menuElement=angular.element(document.getElementById(o.target)),t.element=e.target,e.preventDefault(),e.stopPropagation(),n.$apply(function(){n.callback({$event:e})}),n.$apply(function(){c(e,t.menuElement)}))}),e.bind("keyup",r),e.bind("click",u),e.bind("contextmenu",u),n.$on("$destroy",function(){e.unbind("keyup",r),e.unbind("click",u),e.unbind("contextmenu",u)})}}}]),angular.module("lucidToggle",["appConfig"]).directive("lucidToggle",["config",function(e){return{restrict:"E",scope:{toggle:"=",activetext:"@",inactivetext:"@",label:"@",width:"@",disabled:"@",longLabel:"@"},replace:!0,templateUrl:e.componentsURL+"toggle/lucid-toggle.html",compile:function(e,t){t.width||(t.width=40),t.activetext||(t.activetext="ON"),t.inactivetext||(t.inactivetext="OFF")}}}]),angular.module("editInPlace",["appConfig","puElasticInput"]).directive("editInPlace",["config",function(e){return{restrict:"AE",scope:{editableText:"=?ngModel",placeholder:"@",edit:"=?",doubleClick:"<"},replace:!0,templateUrl:e.componentsURL+"edit-in-place/lucid-edit-in-place.html",controller:["$scope","$element","$timeout",function(e,t,n){e.$watch("edit",function(){e.selectInput()}),e.click=function(t){e.doubleClick||(e.selectInput(),e.edit=!0,t.stopPropagation())},e.dblClick=function(){e.doubleClick&&(e.selectInput(),e.edit=!0)},e.selectInput=function(){var e=t[0].getElementsByTagName("input")[0];n(function(){e.select()},10)}}]}}]),angular.module("puElasticInput",[]).directive("puElasticInput",["$document","$window",function(e,t){function n(e,t){var n="";if(window.getComputedStyle)n=getComputedStyle(e).getPropertyValue(t);else if(e.currentStyle)try{n=e.currentStyle[t]}catch(e){}return n}function i(e){var t=e[0],i;do t=t.parentNode,i=parseInt(n(t,"width"),10)-parseInt(n(t,"padding-left"),10)-parseInt(n(t,"padding-right"),10);while("block"!==n(t,"display")&&"body"!==t.nodeName.toLowerCase());return i+"px"}function o(e,n,o){var c=t.getComputedStyle(n[0]),l="none"===c.maxWidth?i(n):c.maxWidth;n.css("minWidth",o.puElasticInputMinwidth||c.minWidth),n.css("maxWidth",o.puElasticInputMaxwidth||l),angular.forEach(["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing"],function(t){e.css(t,c[t])}),e.css("paddingLeft",c.textIndent),"border-box"===c.boxSizing?angular.forEach(["paddingLeft","paddingRight","borderLeftStyle","borderLeftWidth","borderRightStyle","borderRightWidth"],function(t){e.css(t,c[t])}):"padding-box"===c.boxSizing&&angular.forEach(["paddingLeft","paddingRight"],function(t){e.css(t,c[t])})}var c=angular.element('<div style="position:fixed; top:-999px; left:0;"></div>');return angular.element(e[0].body).append(c),{restrict:"A",link:function e(t,n,i){function l(){var e=n.val()||i.placeholder||"";if(r.text()!==e){r.text(e);var t=parseInt(i.puElasticInputWidthDelta)||1;n.css("width",r.prop("offsetWidth")+t+"px")}}i.$set("ngTrim","true"===i.ngTrim?"true":"false");var r=angular.element('<span style="white-space:pre;">&#000;</span>');o(r,n,i),c.append(r),l(),t.$watch(i.ngModel,l),n.on("keydown keyup focus input propertychange change",l),t.$on("$destroy",function(){r.remove()})}}}]),angular.module("lucidTopTabs",["appConfig"]).directive("lucidTopTabs",["config",function(e){return{restrict:"E",templateUrl:e.componentsURL+"top-tabs/lucid-top-tabs.html",scope:{selectedTab:"=?"},transclude:!0,controller:["$scope",function(e){e.tabs=[],this.addTab=function(t){e.tabs.push(t)},e.$watch("selectedTab",function(t){for(var n=0;n<e.tabs.length;n++)n!==t?e.tabs[n].selected=!1:e.tabs[n].selected=!0})}]}}]).directive("lucidTopTab",["config",function(e){return{restrict:"E",templateUrl:e.componentsURL+"top-tabs/lucid-top-tab.html",transclude:!0,replace:!0,scope:{name:"@name"},require:"^lucidTopTabs",link:function(e,t,n,i){e.selected=""===n.selected||n.selected===!0,i.addTab(e)}}}]),angular.module("lucidTip",["appConfig"]).directive("lucidTip",["config",function(e){return{restrict:"E",scope:{caret:"@",dismiss:"=?",showtip:"=?",width:"@",color:"@"},replace:!0,transclude:!0,templateUrl:e.componentsURL+"tip/lucid-tip.html",compile:function(e,t){t.caret||(t.caret="left")}}}]),angular.module("lucidPaywall",["appConfig"]).directive("lucidPaywall",["config",function(e){return{restrict:"E",scope:{showpaywall:"=?",title:"@",subtitle:"@",confirm:"@",cancel:"@",banner:"@",confirmFunction:"&"},replace:!0,transclude:!0,templateUrl:e.componentsURL+"paywall/lucid-paywall.html",compile:function(e,t){t.banner||(t.banner="PREMIUM")}}}]),angular.module("lucidProgressStepper",["appConfig"]).directive("lucidProgressStepper",["config",function(e){return{restrict:"E",templateUrl:e.componentsURL+"progress-stepper/lucid-progress-stepper.html",scope:{selectedStep:"=?"},transclude:!0,controller:["$scope",function(e){e.steps=[],this.addStep=function(t){e.steps.push(t)},e.$watch("selectedStep",function(t){for(var n=0;n<e.steps.length;n++)n!==t?e.steps[n].selected=!1:e.steps[n].selected=!0})}]}}]).directive("lucidProgressStep",["config",function(e){return{restrict:"E",templateUrl:e.componentsURL+"progress-stepper/lucid-progress-stepper-step.html",transclude:!0,replace:!0,scope:{name:"@name"},require:"^lucidProgressStepper",link:function(e,t,n,i){e.selected=""===n.selected||n.selected===!0,i.addStep(e)}}}]),angular.module("lucidButtonDropdown",["appConfig"]).directive("lucidButtonDropdown",["config",function(e){return{restrict:"E",scope:{text:"@",color:"@",side:"@"},transclude:!0,templateUrl:e.componentsURL+"button-dropdown/lucid-button-dropdown.html"}}]),angular.module("lucidSearch",["appConfig"]).directive("lucidSearch",["config",function(e){return{restrict:"AE",scope:{value:"=?ngModel",width:"@",label:"@",placeholder:"@"},replace:!0,templateUrl:e.componentsURL+"search/lucid-search.html"}}]),angular.module("lucidSlider",["appConfig"]).directive("lucidSlider",["config",function(e){return{restrict:"AE",scope:{slider:"=?ngModel",width:"@",label:"@",min:"@",max:"@",unit:"@",step:"@"},replace:!0,templateUrl:e.componentsURL+"slider/lucid-slider.html",compile:function(e,t){t.step||(t.step=1),t.unit||(t.unit=""),t.slider||(t.slider="0")}}}]),angular.module("lucidTooltip",["appConfig"]).directive("tooltip",["config","$document","$compile","$templateRequest",function(e,t,n,i){return{restrict:"A",scope:{tooltip:"@",hotkey:"@",popover:"@",position:"@"},link:function(o,c,l){i(e.componentsURL+"tooltip/lucid-tooltip.html").then(function(e){var i=angular.element(e),r=n(i)(o),u="tooltip",a="tooltip-show";o.tipClass=[u],o.position?o.tipClass.push("tooltip-"+o.position):o.tipClass.push("tooltip-bottom"),t.find("body").append(r),c.bind("mouseover",function(){function e(e){var t=document.documentElement,n=e[0].getBoundingClientRect(),i=n.top+window.pageYOffset-t.clientTop,o=n.left+window.pageXOffset-t.clientLeft;return{top:i,left:o}}o.popover||r.addClass(a);var t=c[0].getBoundingClientRect(),n=e(r),i=angular.element(c).prop("offsetHeight"),l=angular.element(r)[0].getBoundingClientRect().width,u=t.width||t.right-t.left,p=t.height||t.bottom-t.top,d=10;r.hasClass("tooltip-right")?(n.top=t.top-i/2+p/2+document.body.scrollTop+2,n.left=t.right+d):r.hasClass("tooltip-left")?(n.top=t.top-i/2+p/2+document.body.scrollTop+2,n.left=t.left-l-d):r.hasClass("tooltip-bottom")?(n.top=t.top+p+d+document.body.scrollTop,n.left=t.left-l/2+u/2):(n.top=t.top-i-d+document.body.scrollTop+5,n.left=t.left-l/2+u/2+2),r.css({top:n.top+"px",left:n.left+"px"})}),c.bind("mouseout",function(){r.removeClass(a),o.popover=!1}),l.$observe("popover",function(){"true"===o.popover?(r.removeClass(a),r.addClass("tooltip-hide")):(r.removeClass("tooltip-hide"),r.removeClass(a))}),r.bind("mouseover",function(){o.popover||r.addClass(a)}),c.bind("click",function(){r.removeClass(a),o.popover=!0}),r.bind("mouseout",function(){r.removeClass(a)})})}}}]),angular.module("lucidGrowl",["appConfig"]).directive("lucidGrowl",["config",function(e){return{restrict:"E",scope:{color:"@",hideGrowl:"="},replace:!0,transclude:!0,templateUrl:e.componentsURL+"growl/lucid-growl.html"}}]),angular.module("dynamicHeightHide",[]).animation(".dynamic-height-hide",["$animateCss",function(e){function t(e){var t=e[0].getAttribute("data-slide-toggle");return t||(t=++o,e[0].setAttribute("data-slide-toggle",t)),t}function n(e){var t=c[e];return t||(t={},c[e]=t),t}function i(e,t,n,i,o){return function(){t.animating=!0,t.animator=n,t.doneFn=o,n.start().finally(function(){e&&t.doneFn===o&&(i[0].style.height=""),e||t.doneFn!==o||(i[0].style.height=""),t.animating=!1,t.animator=void 0,t.doneFn()})}}var o=0,c={};return{addClass:function(o,c,l){if("ng-hide"===c){var r=n(t(o)),u=r.animating&&r.height?r.height:o[0].offsetHeight,a=e(o,{from:{height:u+"px"},to:{height:"0px"}});if(a)return r.animating?(r.doneFn=i(!0,r,a,o,l),r.animator.end()):(r.height=u,i(!0,r,a,o,l)())}l()},removeClass:function(o,c,l){if("ng-hide"===c){var r=n(t(o)),u=r.animating&&r.height?r.height:o[0].offsetHeight,a=e(o,{from:{height:"0px",opacity:0},to:{height:u+"px",opacity:1}});if(a)return r.animating?(r.doneFn=i(!1,r,a,o,l),r.animator.end()):(r.height=u,i(!1,r,a,o,l)())}l()}}}]),angular.module("keyPressEvents",[]).directive("pressKey",[function(){return function(e,t,n){t.bind("keydown keypress",function(t){console.log("key pressed",t.keyCode,"wanting key",n.key),t.keyCode===Number(n.key)&&(e.$apply(function(){e.$eval(n.pressKey)}),t.preventDefault())})}}]).directive("ngEnter",[function(){return function(e,t,n){t.bind("keydown keypress",function(t){13===t.which&&(e.$apply(function(){e.$eval(n.ngEnter)}),t.preventDefault())})}}]),angular.module("ngRightClick",[]).directive("ngRightClick",["$parse",function(e){return function(t,n,i){var o=e(i.ngRightClick);n.bind("contextmenu",function(e){t.$apply(function(){e.preventDefault(),o(t,{$event:e})})})}}]),angular.module("clickOutside",[]).directive("clickOutside",["$document",function(e){return{restrict:"A",scope:{clickOutside:"&"},link:function(t,n){e.on("click",function(e){n===e.target||n[0].contains(e.target)||t.$apply(function(){t.$eval(t.clickOutside)})})}}}]);