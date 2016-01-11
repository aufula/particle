angular.module('lucidColors', [])
    .factory('lucidColorFactory', function() {

        var colors = [{
            'colorgroup': 'Brand Colors',
            'colors': [{
                'name': 'Blue Steel',
                'hex': '#3D4752'
            }, {
                'name': 'Blue Steel Secondary',
                'hex': '#77818C',
                'location': 'megamenu top, buttons, secondary toolbar, footer, pinned shapegroups in search'
            }, {
                'name': 'Lucid Blue',
                'hex': '#29AAE1',
                'location': 'primary actions, text on buttons, border color, alert badges, '
            }, {
                'name': 'Lucidchart Orange ',
                'hex': '#FC8D2A'
            }, {
                'name': 'Press Green',
                'hex': '#8CBF3F',
                'location': 'Press Logo'
            },]
        }, {
            'colorgroup': 'secondary',
            'colors': [{
                'name': 'Blue Steel Secondary - Dark',
                'hex': '#606D79',
                'location': 'unpinned shapegroups in search shapes, chat (maybe)'
            }, {
                'name': 'Blue Steel Light',
                'hex': '#AFB7BF',
                'location': 'page drawer'
            }, {
                'name': 'Lucid Blue Light',
                'hex': '#CAEFFF',
                'location': 'on/off switch background, '
            }]

        }, {
            'colorgroup': 'Information',
            'colors': [{
                'name': 'Alert Red',
                'hex': '#ED6058'
            }, {
                'name': 'Alert Red Light',
                'hex': '#FBDCDA',
                'location': 'background color on red, '
            }, {
                'name': 'Information Blue',
                'hex': '#29AAE1',
                'location': 'background color on red, '
            }, {
                'name': 'Information Blue Light',
                'hex': '#D6E9F1',
                'location': 'background color on red, '
            }, {
                'name': 'Success Green',
                'hex': '#8CBF3F',
                'location': 'background color on red, '
            }, {
                'name': 'Success Green Light',
                'hex': '#E9F2D9',
                'location': 'background color on red, '
            }]
        }, {
            'colorgroup': 'UI Colors',
            'colors': [{
                'name': 'Gray - Light',
                'hex': '#F1F1F1',
                'location': 'Component well, popover background, footer of modal'
            }, {
                'name': 'Gray - Secondary',
                'hex': '#EBECED',
                'location': 'optionbar, right dock background'
            }, {
                'name': 'Gray - Tertiary',
                'hex': '#DEE1E3',
                'location': 'right dock tabs, popover background 2'
            }, {
                'name': 'Gray - Dark',
                'hex': '#CDCFD1',
                'location': 'collapse bars, shape group tops, scroll shape panel'
            }, {
                'name': 'Grey 4',
                'hex': '#E1E2E3',
                'location': 'shapes panel left bg'
            }, {
                'name': 'Grey 5',
                'hex': '#EDEDED',
                'location': 'optionbar'
            }, {
                'name': 'Grey 6',
                'hex': '#D9DADB',
                'location': 'drop shape area'
            }, {
                'name': 'Grey 7',
                'hex': '#F3F3F3',
                'location': 'context menu hover'
            }, {
                'name': 'Grey 8',
                'hex': '#AFB1B3',
                'location': 'left panel scroll bar, unpinned shapegroups when search'
            }, {
                'name': 'Grey 9',
                'hex': '#F0F0F1',
                'location': 'left panel advanced shapes stuff (Quizbowl) is actually 50% white.'
            }]
        }];
        return colors;
    });