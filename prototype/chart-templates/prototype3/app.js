/*global angular : true fixes codekit error*/
/*global console : true fixes codekit error*/

angular.module('particleApp', ['lucidComponents'])
    ////////////////
    ////START MAIN CTRL
    ////////////////
    .controller('mainCtrl', function($scope) {


     ////New document button that takes you into editor

        $scope.createDocument = function(){
            window.location = "editor/index.html";
        };


        $scope.getSecondDrawer = function(){
            $scope.secondTemplateDrawer = !$scope.secondTemplateDrawer;

            if($scope.secondTemplateDrawer == false){
                $scope.templateDrawer = false;
            }
            if($scope.secondTemplateDrawer == true){
                $scope.help = 'LESS';
            }


          };



        $scope.templates = [
            {name:'New', diagram: 'Flowchart', category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/plus.svg'},
            {name:'Basic', diagram: 'Flowchart',  category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_flow.png'},
            {name:'Organization', diagram: 'Flowchart', category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_org.png'},
            {name:'BPMN 2.0', diagram: 'Flowchart', category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_bpmn.png'},
            {name:'SIPOC', diagram: 'Flowchart', category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_sipoc.png'},

            {name:'New', diagram: 'Table', category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/plus.svg'},
            {name:'SWOT Analysis', diagram: 'Table', category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_swot.png'},

            {name:'New', diagram: 'Circuit Diagram', category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_swot.png'},
            {name:'Basic', diagram: 'Circuit Diagram', category: 'Business', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_swot.png'},

            {name:'New', diagram: 'iOS Mockup', category: 'Design', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/plus.svg'},
            {name:'Phone', diagram: 'iOS Mockup', category: 'Design', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_iphone.png'},

            {name:'New', diagram: 'Android Mockup', category: 'Design', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/plus.svg'},
            {name:'Phone', diagram: 'Android Mockup', category: 'Design', preview: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_android.png'},

            {name:'New', diagram: 'Wireframe', category: 'Design', preview: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/plus.svg'},
            {name:'Dialog', diagram: 'Wireframe', category: 'Design', preview: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_wireframe.png'},

            {name:'New', diagram: 'Floorplan', category: 'Design', preview: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/plus.svg'},
            {name:'House', diagram: 'Floorplan', category: 'Design', preview: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_floorplan2.png'},
            {name:'Office', diagram: 'Floorplan', category: 'Design', preview: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_floorplan1.png'},

            {name:'New', diagram: 'Flowchart', category: 'Education', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/plus.svg'},
            {name:'Basic', diagram: 'Flowchart',  category: 'Education', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_flow.png'},
            {name:'Organization', diagram: 'Flowchart', category: 'Education', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_org.png'},

            {name:'New', diagram: 'Venn Diagram', category: 'Education', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/plus.svg'},
            {name:'Basic', diagram: 'Venn Diagram',  category: 'Education', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_bpmn.png'},
            {name:'Three Circle Venn', diagram: 'Venn Diagram',  category: 'Education', preview:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/template_sipoc.png'},

          ];




    })
