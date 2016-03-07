angular.module("particleApp",["lucidComponents","ngDraggable","ngSortable","dndLists","ngRoute"]).controller("mainCtrl",function(e,t,n,a){n.insertSmartContent=function(e){n.selectedBlock.text.text=e,n.selectedBlock.edit=!0},n.selectedBlock={type:"document"},e.loading=function(){console.log("loading"),n.loadingClass="loaded",n.pages=a,t(function(){n.loadedClass="loaded",console.log("loaded"),t(function(){n.loadingClass="",console.log("finished load")},2e3)},6e3)},n.saveDocument=function(){e.savetext="saving...",t(function(){e.savetext="saved"},1e3)}}).controller("RightDockCtrl",function(e){e.activepanel="document"}).controller("leftPanelCtrl",function(e,t,n){e.openTab="none",t.setTab=function(n){n===e.openTab?(e.openTab="none",e.leftPanelOpen=!1):(e.openTab=n,e.leftPanelOpen=!0,t.panelOpenLoading=!0,console.log("panel open"))},e.changeTemplates=function(e){t.currentTemplates={groupname:e.groupname},n(function(){t.currentTemplates=e},500)}}).controller("templateCtrl",function(e,t,n,a){e.pressTemplates=a}).controller("PagesCtrl",function(e,t,n,a){n.pages=a,n.currentPage=a[0],e.editName=function(e){t(function(){e.edit=!0},100)},e.changePage=function(e){var a={name:e.name,blocks:[]};n.currentPage=a,t(function(){n.currentPage=e,n.pageNumber=e.$index},10)},e.addPage=function(){var e=n.pages.length,a=(new Date).getTime(),l={name:"New Page "+(+e+1),id:a,blocks:[""]};n.pages.splice(e,0,l),t(function(){n.currentPage=l},10),n.saveDocument()},e.duplicatePage=function(e,a){var l=JSON.parse(JSON.stringify(e)),o=+a+1,c=(new Date).getTime();l.id=c,l.name=e.name+" Copy",n.pages.splice(o,0,l),t(function(){n.currentPage=l},10),n.saveDocument()},n.masterPageCount=function(){var e=[];return angular.forEach(n.pages,function(t){t.master&&e.push(t)}),e},e.deletePage=function(a,l){n.pages.splice(l,1),t(function(){n.pages[l]?e.changePage(n.pages[l]):e.changePage(n.pages[l-1])},10),n.saveDocument()},e.applyMaster=function(e){e.masterapplied=!0,console.log("page",e),t(function(){e.masterapplied=!1},2e3),n.saveDocument()},e.applyMasterAll=function(){console.log("master applied to all"),angular.forEach(n.pages,function(t){t.master||e.applyMaster(t)})},n.saveDocument()}).controller("canvasCtrl",function(e,t){t.deselectBlock=function(){if(t.selectedBlock){var e=JSON.parse(JSON.stringify(t.selectedBlock));e.table=!1,t.selectedBlock=e}},e.dragoverCallback=function(t,n,a,l){return e.logListEvent("dragged over canvas",t,n,a,l),10>n},e.dropCallback=function(t,n,a,l,o,c){if(e.logListEvent("dropped at canvas",t,n,l,o),l){if("itemType"===c&&!a.label)return!1;if("containerType"===c&&!angular.isArray(a))return!1}return a},e.dropToCanvas=function(e,n){t.saveDocument();var a=t.currentPage.blocks.indexOf(e);if(-1===a&&e){e.metrics||(e={customcolor:!1,swatch:{fill:"#ffffff",text:"#333333",border:"#666666"},swatchnumber:1,borderwidth:3,borderstyle:"solid",text:{verticalalignment:"middle",horizontalalignment:"center",text:e.name,size:"12px"},padding:10,metrics:{z:2,width:120,height:45},shapepanel:!1});var l=angular.element(document.querySelector("#lucid-canvas"))[0].getBoundingClientRect().left,o=angular.element(document.querySelector("#lucid-canvas"))[0].getBoundingClientRect().top;e.metrics.x=n.pageX-l-e.metrics.width/2,e.metrics.y=n.pageY-o-e.metrics.height/2,console.log("shape",e,n.pageX,n.pageY,"total: ",n),t.currentPage.blocks.push(e),t.selectedBlock=e}},e.onDragSuccess=function(e,t){if(t.x>54){var n=angular.element(document.querySelector("#lucid-canvas"))[0].getBoundingClientRect().left,a=angular.element(document.querySelector("#lucid-canvas"))[0].getBoundingClientRect().top;if(e){if(angular.element(t.event.srcElement).hasClass("lucid-block-comment"))return void console.log("comment");e.metrics.x=t.x-n-t.element.centerX,e.metrics.y=t.y-a-t.element.centerY,e.shapepanel=!1}}}}).factory("prototypeData",[function(){var e=[{name:"Page 1",thumb:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/NAHB-1-Full.jpg",id:1,canvasBG:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/NAHB-1-Full.jpg",blocks:[{lock:{lock:"unlock",position:!1,style:!1,content:!1},type:"image",backgroundImage:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/NAHB-logo.jpg",swatch:{fill:"transparent",text:"#AEAEAE",border:"transparent"},borderwidth:3,borderstyle:"solid",text:{verticalalignment:"middle",horizontalalignment:"center",text:"",size:16},padding:7,metrics:{z:2,x:35,y:323,width:218,height:63}},{type:"text",lock:{lock:"unlock",position:!1,style:!1,content:!1},swatch:{fill:"transparent",text:"#FFF",border:"transparent"},borderwidth:3,borderstyle:"solid",text:{verticalalignment:"middle",horizontalalignment:"center",text:"Single Family Homes",size:40},padding:4,metrics:{z:2,x:24,y:640,width:380,height:50}},{type:"text",lock:{lock:"unlock",position:!1,style:!1,content:!1},swatch:{fill:"transparent",text:"#FFF",border:"transparent"},borderwidth:3,borderstyle:"solid",text:{verticalalignment:"middle",horizontalalignment:"center",text:"January",size:28},padding:4,metrics:{z:2,x:687,y:374,width:180,height:50}}]}];return e}]).directive("editPressText",[function(){return{restrict:"AE",scope:{editableText:"=ngModel",placeholder:"@",edit:"=",editable:"="},replace:!0,template:'<span class="edit-in-place-wrapper">    <span clickr-outside="edit=false">       <span class="edit-in-place" ng-show="!edit" ng-dblclick="editText(); $event.stopPropagation();">{{editableText}}</span>       <input class="edit-in-place edit-in-place-input" ng-model="editableText" click-outside="edit=false" ng-show="edit" ng-enter="edit=false" placeholder="{{placeholder}}" ng-dblclick="selectInput(); $event.stopPropagation();">   </span></span>',controller:["$scope","$element","$timeout",function(e,t,n){e.editText=function(){e.editable&&(e.edit=!0,e.selectInput())},e.$watch("edit",function(){e.selectInput()}),e.selectInput=function(){var e=t[0].getElementsByTagName("input")[0];n(function(){e.select()},10)}}]}}]);