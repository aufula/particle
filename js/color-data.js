angular.module('lucidColors', [])
    .factory('lucidColorFactory', function() {

        var colors = [{
            'colorgroup': 'Brand Colors',
            'colors': [{
                'name': 'Blue Steel',
                'hex': '#3D4752',
                'less': '@blue-steel'
            }, {
                'name': 'Blue Steel Secondary',
                'hex': '#77818C',
                'less': '@blue-steel-2',
            }, {
                'name': 'Lucid Blue',
                'hex': '#29AAE1',
                'less': '@lucid-blue',
            }, {
                'name': 'Lucidchart Orange ',
                'hex': '#FC8D2A',
                'less': '@lucidchart-orange'
            }, {
                'name': 'Press Green',
                'hex': '#8CBF3F',
                'location': 'Press Logo',
                'less': '@lucidpress-green'
            }, ]
        }, {
            'colorgroup': 'UI Colors',
            'colors': [{
                'name': 'Gray - 1',
                'hex': '#F0F0F0',
                'less': '@grey-1'
            }, {
                'name': 'Gray - 2',
                'hex': '#E6E6E6',
                'less': '@grey-2'
            }, {
                'name': 'Gray - 3',
                'hex': '#D6D6D8',
                'less': '@grey-3'
            }, {
                'name': 'Gray - 4',
                'hex': '#CDCED1',
                'less': '@grey-4'
            }, {
                'name': 'Gray - 5',
                'hex': '#A5A5A5',
                'less': '@grey-5'
            }]
        }, {
            'colorgroup': 'Information Colors',
            'colors': [{
                'name': 'Alert Red',
                'hex': '#ED6058',
                'less': '@info-red',
            }, {
                'name': 'Alert Red Light',
                'hex': '#FBDCDA',
                'less': '@info-red-light',
                'light': 'light'
            }, {
                'name': 'Information Blue',
                'hex': '#29AAE1',
                'less': '@info-blue',
            }, {
                'name': 'Information Blue Light',
                'hex': '#D2EDF9',
                'less': '@info-blue-light',
                'light': 'light',
            }, {
                'name': 'Success Green',
                'hex': '#8CBF3F',
                'less': '@info-green',
            }, {
                'name': 'Success Green Light',
                'hex': '#E9F2D9',
                'less': '@info-green-light',
            }]
        }, {
            'colorgroup': 'Secondary Colors',
            'colors': [{
                'name': 'Blue Steel Dark',
                'hex': '#606D79',
                'less': '@blue-steel-dark',
            }, {
                'name': 'Blue Steel Light',
                'hex': '#AFB7BF',
                'less': '@blue-steel-light',
                'light': 'light'
            }, {
                'name': 'Lucid Blue Light',
                'hex': '#D2EDF9',
                'less': '@lucid-blue-light',
                'light': 'light'
            }, {
                'name': 'Gray - Border',
                'hex': '#D2D2D2',
                'less': '@grey-border'
            }]

        }, {
            'colorgroup': 'Text Colors',
            'colors': [{
                'name': 'Standard Text',
                'hex': '#5A5A5A',
                'less': '@standard-text',
            }, {
                'name': 'Ghost Text',
                'hex': '#828282',
                'less': '@standard-text-light',
                'light': 'light'
            }, {
                'name': 'Lucid Blue Dark',
                'hex': '#2C84B5',
                'less': '@lucid-blue-dark',
                'light': 'light'
            }]

        }];
        return colors;
    });