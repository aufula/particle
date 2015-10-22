/*global angular : true fixes codekit error*/
angular.module('lucidCanvasData', [])
    .factory('canvasData', function() {

        var blockElements = [{
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "comment": {
                "text": "yep this is a comment"
            },
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME 1",
                "size": "12px",
            },

            "padding": 5,
            "metrics": {
                "z": 2,
                "x": 390,
                "y": 139,
                "width": 120,
                "height": 45
            },
            "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'

        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 393,
                "y": 245,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 625,
                "y": 245,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 157,
                "y": 245,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 77,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 202,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "comment": {
                "text": "yep this is a comment"

            },
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 327,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 563,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ee5b42",
                "text": "#ffffff",
                "border": "#ee5b42"
            },
            "swatchnumber": 4,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 688,
                "y": 335,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME0",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 688,
                "y": 425,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 563,
                "y": 425,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#a3d977",
                "text": "#ffffff",
                "border": "#a3d977"
            },
            "swatchnumber": 5,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 563,
                "y": 515,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "swatchnumber": 1,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 262,
                "y": 425,
                "width": 120,
                "height": 45
            },


        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#6db7c4",
                "text": "#ffffff",
                "border": "#6db7c4"
            },
            "swatchnumber": 6,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "EMPLOYEE NAME",
                "size": "12px",
            },

            "padding": 10,
            "metrics": {
                "z": 2,
                "x": 137,
                "y": 425,
                "width": 120,
                "height": 45
            },

        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#6db7c4",
                "text": "#ffffff",
                "border": "#6db7c4"
            },
            "swatchnumber": 6,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "",
                "size": "12px",
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "font": "Source Sans Pro",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 591,
                "y": 626,
                "width": 22,
                "height": 22
            },
            "radius": 15,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#a3d977",
                "text": "#ffffff",
                "border": "#a3d977"
            },
            "swatchnumber": 5,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "",
                "size": "12px",
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "font": "Source Sans Pro",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 433,
                "y": 626,
                "width": 22,
                "height": 22
            },
            "radius": 15,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "#ee5b42",
                "text": "#ffffff",
                "border": "#ee5b42"
            },
            "swatchnumber": 4,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "",
                "size": "12px",
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "font": "Source Sans Pro",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 245,
                "y": 626,
                "width": 22,
                "height": 22
            },
            "radius": 15,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#ee5b42",
                "border": "transparent"
            },
            "swatchtype": "text",
            "swatchnumber": 4,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "5+ YEAR TENURE",
                "size": "13px",
                "verticalalignment": "middle",
                "horizontalalignment": "left",
                "font": "Oswald, sans-serif",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 272,
                "y": 625,
                "width": 150,
                "height": 22
            },
            "radius": 0,
            "z": 2
        }, {
            "swatchtype": "text",
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#a3d977",
                "border": "transparent"
            },
            "swatchnumber": 5,
            "borderwidth": 3,
            "borderstyle": "solid",
            "text": {
                "text": "NEW HIRE (MONTHS)",
                "size": "13px",
                "verticalalignment": "middle",
                "horizontalalignment": "left",
                "font": "Oswald, sans-serif",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 463,
                "y": 625,
                "width": 125,
                "height": 22
            },
            "radius": 0,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#6db7c4",
                "border": "transparent"
            },
            "swatchnumber": 6,
            "borderwidth": 3,
            "borderstyle": "solid",
            "swatchtype": "text",
            "text": {
                "text": "INTERN",
                "size": "13px",
                "verticalalignment": "middle",
                "horizontalalignment": "left",
                "font": "Oswald, sans-serif",
            },
            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 617,
                "y": 625,
                "width": 125,
                "height": 22
            },
            "radius": 0,
            "z": 2
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#999999",
                "border": "transparent"
            },
            "swatchnumber": 2,
            "borderwidth": 3,
            "swatchtype": "text",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "COMPANY NAME",
                "size": "24px",
                "weight": "light",
                "letterspacing": "0px",
                "font": "Oswald, sans-serif"
            },

            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 342,
                "y": 15,
                "width": 220,
                "height": 35
            },
            "radius": 0
        }, {
            "customcolor": false,
            "swatch": {
                "fill": "transparent",
                "text": "#999999",
                "border": "transparent"
            },
            "swatchnumber": 2,
            "borderwidth": 3,
            "swatchtype": "text",
            "text": {
                "verticalalignment": "middle",
                "horizontalalignment": "center",
                "text": "DEPARTMENT NAME",
                "size": "12px",
                "weight": "light",
                "letterspacing": "-1px",
                "font": "sans-serif"
            },

            "padding": 0,
            "metrics": {
                "z": 2,
                "x": 342,
                "y": 53,
                "width": 220,
                "height": 14
            },
            "radius": 0
        }];
        return blockElements;
    })


///stores themes data
.factory('lucidThemesData', function() {
    var lucidThemes = [{
        "name": "Standard",
        "pagecolor": "#ffffff",
        "linecolor": "#999999",
        "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/asset-default-theme-thumbnail_360.jpg",
        "swatches": [{
            "swatch": {
                "fill": "#ffffff",
                "text": "#333333",
                "border": "#666666"
            },
            "radius": 5
        }, {
            "swatch": {
                "fill": "#999999",
                "text": "#ffffff",
                "border": "#999999"
            }
        }, {
            "swatch": {
                "fill": "#cccccc",
                "text": "#ffffff",
                "border": "#cccccc"
            }
        }, {
            "swatch": {
                "fill": "#ee5b42",
                "text": "#ffffff",
                "border": "#ee5b42"
            }
        }, {
            "swatch": {
                "fill": "#6db7c4",
                "text": "#ffffff",
                "border": "#6db7c4"
            }
        }, {
            "swatch": {
                "fill": "#a3d977",
                "text": "#ffffff",
                "border": "#a3d977"
            }
        }]

    }, {
        "name": "Blueprint",
        "pagecolor": "#4187ad",
        "linecolor": "#99d2f2",
        "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/asset-blueprint-theme-thumbnail_360.jpg",
        "swatches": [{
            "swatch": {
                "fill": "#3b5878",
                "text": "#ffffff",
                "border": "#2d435c"
            },
            "shadow": {
                "shadow": false,
                "blur": 10,
                "x": 2,
                "y": 3,
                "color": "rgba(0,0,0,0)"
            },
            "radius": 0
        }, {
            "swatch": {
                "fill": "#99d2f2",
                "text": "#ffffff",
                "border": "#99d2f2"
            }
        }, {
            "swatch": {
                "fill": "#999999",
                "text": "#ffffff",
                "border": "#999999"
            }
        }, {
            "swatch": {
                "fill": "#ff8f80",
                "text": "#3b5878",
                "border": "#ff8f80"
            }
        }, {
            "swatch": {
                "fill": "#ffdf71",
                "text": "#3b5878",
                "border": "#ffdf71"
            }
        }, {
            "swatch": {
                "fill": "#a3d977",
                "text": "#3b5878",
                "border": "#a3d977"
            }
        }]

    }, {
        "name": "Boardroom",
        "pagecolor": "#3e3e3e",
        "linecolor": "#cccccc",
        "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/asset-boardroom-theme-thumbnail_360.jpg",
        "swatches": [{
            "swatch": {
                "fill": "#666666",
                "text": "#ffffff",
                "border": "#999999"
            },
            "shadow": {
                "shadow": false,
                "blur": 10,
                "x": 2,
                "y": 3,
                "color": "rgba(0,0,0,0)"
            },
            "radius": 0
        }, {
            "swatch": {
                "fill": "#999999",
                "text": "#ffffff",
                "border": "#999999"
            }
        }, {
            "swatch": {
                "fill": "#cccccc",
                "text": "#ffffff",
                "border": "#cccccc"
            }
        }, {
            "swatch": {
                "fill": "#ee5b42",
                "border": "#ee5b42",
                "text": "#ffffff"
            }
        }, {
            "swatch": {
                "fill": "#6db7c4",
                "border": "#6db7c4",
                "text": "#ffffff"
            },
        }, {
            "swatch": {
                "fill": "#a3d977",
                "text": "#ffffff",
                "border": "#a3d977"
            }
        }]

    }, {
        "name": "Sandstorm",
        "pagecolor": "#fff9ed",
        "linecolor": "#999999",
        "thumbnail": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/asset-sandstorm-theme-thumbnail_360.jpg",
        "swatches": [{
            "swatch": {
                "fill": "#ffe5b6",
                "text": "#666666",
                "border": "#666666"
            },
            "shadow": {
                "shadow": false,
                "blur": 10,
                "x": 2,
                "y": 3,
                "color": "rgba(0,0,0,0)"
            },
            "radius": 0
        }, {
            "swatch": {
                "fill": "#999999",
                "text": "#ffffff",
                "border": "#999999"
            }
        }, {
            "swatch": {
                "fill": "#cccccc",
                "text": "#ffffff",
                "border": "#cccccc"
            }
        }, {
            "swatch": {
                "fill": "#ee5b42",
                "border": "#ee5b42",
                "text": "#ffffff"
            }
        }, {
            "swatch": {
                "fill": "#f0b74c",
                "border": "#f0b74c",
                "text": "#ffffff"
            },
        }, {
            "swatch": {
                "fill": "#6db7c4",
                "text": "#ffffff",
                "border": "#6db7c4"
            }
        }]

    }];
    return lucidThemes;
});