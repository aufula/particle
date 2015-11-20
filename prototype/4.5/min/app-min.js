angular.module("particleApp",["lucidComponents"]).controller("ShareCtrl",function(e){e.showPopup=function(){e.showing=!0,e.dummyData={name:"",role:"Editor"}},e.addPerson=function(n){e.collaborators.push(n),e.showing=!1,e.dummyData={}},e.collaborators=[{name:"Ryan Contreras",role:"Owner",image:"https://s3.amazonaws.com/uifaces/faces/twitter/zack415/128.jpg"},{name:"Dave Smith",role:"Commenter",image:"https://s3.amazonaws.com/uifaces/faces/twitter/marcosmoralez/128.jpg"}]}).controller("RightDockCtrl",function(e,n){e.openTab="",e.showTooltipPresent=!0,e.showTooltipHistory=!0,e.setTab=function(o){o===e.openTab?e.openTab="":e.openTab=o,"comments"===e.openTab?n.showComments=!0:"present"===e.openTab?n.showSlides=!0:(n.showComments=!1,n.showSlides=!1),""===e.openTab?e.rightDock=!1:e.rightDock=!0}}).controller("ShapesManagerCtrl",function(e,n,o,t,a){e.shapegroups=o.all(),e.clickShapes=function(){e.searchshapes?e.searchshapes=!1:n.manageshapes=!n.manageshapes},e.newCustomGroup=function(){var e={groupname:"New Group",custom:!0,edit:!0,shapes:[{fake:"fake"}]};o.addGroup(e)},e.editName=function(e,n){e.edit=!0;var o="name-input-"+n;a(function(){document.getElementById(o).select()},10),e.edit=!0},e.pinnedCount=5,e.pinGroup=function(n){var t=o.get(n.id);t.pinned=!0,e.pinnedCount+=1,n.pinnedOrder=e.pinnedCount,e.showPinMessage(n),console.log("pin")},e.unPinGroup=function(e){var n=o.get(e.id);n.pinned=!1,console.log("unpin")},e.togglePin=function(n){n.pinned?e.unPinGroup(n):e.pinGroup(n)},e.showPinMessage=function(n){var o=document.getElementById("left-panel-shapes").offsetHeight<document.getElementById("left-panel-shapes-scroll").offsetHeight;o&&(e.overflowMessage=!0,e.overflowMessageTitle=n.groupname,a(function(){e.overflowMessage=!1},2e3))},e.openWindow=function(e){window.open(e,"_blank","toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400")},e.dragoverCallback=function(n,o,t,a){return e.logListEvent("dragged over",n,o,t,a),o},e.dropCallback=function(n,o,t,a,r,s){return e.logListEvent("dropped at",n,o,a,r),a&&"containerType"===s&&!angular.isArray(t)?!1:t},e.logEvent=function(e,n){console.log(e,"(triggered by the following",n.type,"event)"),console.log(n)},e.logListEvent=function(n,o,t,a,r){var s=a?"External ":"";s+=r+" element is "+n+" position "+t,e.logEvent(s,o)}}).controller("ShapeGroupCtrl",function(e){e.onDropComplete=function(n){if(console.log("dropped"),n){var o=e.shapes.indexOf(n);if(-1===o){var t=JSON.parse(JSON.stringify(n));t.shapepanel=!0,t.customcolor=!0,t.url||(t.svg='<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="'+n.swatch.border+'" fill="'+n.swatch.fill+'"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="'+n.swatch.text+'"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>'),e.shapes.push(t)}}},e.custom?e.dragEffect="copyMove":e.dragEffect="copy",e.dragoverCallback=function(n,o){return e.logListEvent("dragged over",n,o),o},e.dropCallback=function(n,o,t,a,r,s){return console.log("dropped in saved shapes",t),e.onDropComplete(t,n),a&&"true"===s?!1:void 0},e.logEvent=function(e,n){console.log(e,"(triggered by the following",n.type,"event)"),console.log(n)},e.logListEvent=function(n,o,t,a,r){var s=a?"External ":"";s+=r+" element is "+n+" position "+t,e.logEvent(s,o)}}).controller("PagesCtrl",function(e,n,o,t){o.pages=t,o.currentPage=t[0],e.sortConfig={group:"foobar",animation:150},e.addPage=function(){var e=o.pages.length,t=(new Date).getTime(),a={name:"New Page "+(+e+1),id:t};o.pages.splice(e,0,a),n(function(){o.currentPage=a},10)},e.duplicatePage=function(e,t){var a=JSON.parse(JSON.stringify(e)),r=+t+1,s=(new Date).getTime();a.id=s,a.name=e.name+" Copy",o.pages.splice(r,0,a),n(function(){o.currentPage=a},10)},o.masterPageCount=function(){var e=[];return angular.forEach(o.pages,function(n){n.master&&e.push(n)}),e},e.deletePage=function(e,t){o.pages.splice(t,1),n(function(){o.pages[t]?o.currentPage=o.pages[t]:o.currentPage=o.pages[t-1]},10)},e.applyMaster=function(e){e.masterapplied=!0,console.log("page",e),n(function(){e.masterapplied=!1},2e3)},e.applyMasterAll=function(){console.log("master applied to all"),angular.forEach(o.pages,function(n){n.master||e.applyMaster(n)})}});