var particleApp=angular.module("particleApp",["appConfig","ngRoute","lucidComponentFactory","ngAnimate","lucidComponents","hljs","lucidIcons","lucidSnippets","lucidProductionFactory","lucidColors"]);particleApp.run(["$route","$rootScope","$location",function(o,e,t){var n=t.path;t.path=function(r,l){if(l===!1)var c=o.current,a=e.$on("$locationChangeSuccess",function(){o.current=c,a()});return n.apply(t,[r])}}]),particleApp.config(function(o){o.when("/overview",{templateUrl:"templates/landing-page.html"}).when("/codepen",{templateUrl:"templates/codepen.html"}).when("/angular",{templateUrl:"templates/angular.html",controller:"angularController"}).when("/components",{templateUrl:"templates/components.html",controller:"componentController"}).when("/components/:componentGroupID",{templateUrl:"templates/components.html",controller:"componentController",reloadOnSearch:!1}).when("/components/:componentGroupID/:searchResults",{templateUrl:"templates/components.html",controller:"componentController"}).when("/icons",{templateUrl:"templates/icons.html",controller:"iconController",reloadOnSearch:!1}).when("/icons/:searchResults",{templateUrl:"templates/icons.html",controller:"iconController",reloadOnSearch:!1}).when("/production",{templateUrl:"templates/production-components.html",controller:"productionController",reloadOnSearch:!1}).when("/production/:searchResults",{templateUrl:"templates/production-components.html",controller:"productionController",reloadOnSearch:!1}).when("/colors",{templateUrl:"templates/colors.html",controller:"colorController",reloadOnSearch:!1}).when("/colors/:searchResults",{templateUrl:"templates/colors.html",controller:"colorController",reloadOnSearch:!1}).otherwise({redirectTo:"/overview"})}),particleApp.controller("mainController",function(o,e,t){o.isActive=function(o,t){var n=o+t,r=e.url().indexOf(n)>-1;return r},o.componentGroups=t}),particleApp.controller("iconController",function(o,e,t,n,r){e.icongroups=t,e.$watch("searchResults",function(o){if(null!=o){var e="/icons/"+o;r.path(e,!1)}}),angular.forEach(e.icongroups,function(e){angular.forEach(e.icons,function(e){e.url=o.componentsURL+"icon/icons/"+e.name+".svg"})}),e.searchResults=n.searchResults}),particleApp.controller("componentController",function(o,e,t,n,r){o.componentGroupID=t.componentGroupID,o.components=n("filter")(e,{groupid:t.componentGroupID}),o.componentPath="components/2.0/",o.searchResults=t.searchResults,o.$watch("searchResults",function(e){if(null!=e){var t="/components/"+o.componentGroupID+"/"+e;r.path(t,!1)}})}),particleApp.controller("angularController",function(o,e,t){o.getIframeSrc=function(o){return e.trustAsResourceUrl(o)},o.snippets=t}),particleApp.controller("productionController",function(o,e,t,n,r){o.productionComponents=e,o.searchResults=t.searchResults,o.$watch("searchResults",function(o){if(null!=o){var e="/production/"+o;r.path(e,!1)}}),o.openURL=function(o){var e=window.open(o,"_blank");e.focus()}}),particleApp.controller("colorController",function(o,e,t,n,r){o.colors=e,o.searchResults=t.searchResults,o.$watch("searchResults",function(o){if(null!=o){var e="/colors/"+o;r.path(e,!1)}})}),particleApp.controller("colorCtrl",function(o,e){o.copyItem=function(t){o.copied=t,e(function(){o.copied=null},750)}}),particleApp.directive("collapse",["$timeout",function(o){return{restrict:"A",link:function(e,t,n){function r(){var o=l();c.style.height="auto";var e=l();return c.style.height=o,l(),e}function l(){return c.offsetHeight}var c=t[0];e.$watch(n.collapse,function(e){o(function(){var o=e?0:r();c.style.height=o+"px",t.toggleClass("collapsed",e)},10)}),e.updateHeight=function(){o(function(){var o=r();c.style.height=o+"px"},1)}}}}]),particleApp.directive("clipboard",["$document",function(o){return{restrict:"A",scope:{onCopied:"&",onError:"&",text:"="},link:function(e,t){function n(e){var t=o[0].createElement("textarea");return t.style.position="absolute",t.style.left="-10000px",t.textContent=e,t}function r(e){o[0].body.style.webkitUserSelect="initial";var t=o[0].getSelection();if(t.removeAllRanges(),e.select(),!o[0].execCommand("copy"))throw"failure copy";t.removeAllRanges(),o[0].body.style.webkitUserSelect=""}function l(e){var t=n(e);o[0].body.appendChild(t),r(t),o[0].body.removeChild(t)}t.on("click",function(){try{l(e.text),angular.isFunction(e.onCopied)&&e.$evalAsync(e.onCopied())}catch(o){angular.isFunction(e.onError)&&e.$evalAsync(e.onError({err:o}))}})}}}]);