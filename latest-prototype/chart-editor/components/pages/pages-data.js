angular.module('pagesData', [])
    //chart data
    .factory('pagesData', [function() {
        //this factory will contain page data, block elements, positoins etc.
        var lucidPages = [{
            'name': 'Page 1',
            'thumb': 'assets/thumb-placeholder-flowchart.png',
            'id': 14543,
            'canvasBG': '#FFF',
            'blocks': [{
                "customcolor": false,
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#AEAEAE",
                    "border": "#666666"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "comment": {
                    "text": "yep this is a comment"
                },
                "table": true,
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Process",
                    "size": 16,
                },

                "padding": 7,
                "metrics": {
                    "z": 2,
                    "x": 75,
                    "y": 75,
                    "width": 120,
                    "height": 100
                },
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'

            }, {
                "customcolor": false,
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#AEAEAE",
                    "border": "#666666"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Process",
                    "size": 16,
                },

                "padding": 7,
                "metrics": {
                    "z": 2,
                    "x": 75,
                    "y": 243,
                    "width": 120,
                    "height": 80
                },


            }],
            'lines': [{
                "points": "450.5 184 450.5 240",
                "endarrow": true,
                "width": 3,
            }],
            'linecolor': '#333'
        }];
        return lucidPages;
    }]);