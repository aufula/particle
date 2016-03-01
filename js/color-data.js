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
                'less': '@grey-1',
                'light': 'light'
            }, {
                'name': 'Gray - 2',
                'hex': '#E6E6E6',
                'less': '@grey-2',
                'light': 'light'
            }, {
                'name': 'Gray - 3',
                'hex': '#D6D6D8',
                'less': '@grey-3',
                'light': 'light'
            }, {
                'name': 'Gray - 4',
                'hex': '#CDCED1',
                'less': '@grey-4',
                'light': 'light'
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
                'light': 'light'
            }]
        }, {
            'colorgroup': 'Secondary Colors',
            'colors': [{
                'name': 'Blue Steel Dark',
                'hex': '#212C35',
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
                'name': 'Grey - Border',
                'hex': '#D2D2D2',
                'less': '@grey-border',
                'light': 'light'
            }, {
                'name': 'Grey - Border Dark',
                'hex': '#A5A5A5',
                'less': '@grey-border-dark',
            }, {
                'name': 'Modal Background Overlay',
                'hex': 'rgba(69, 75, 82, 0.4)',
                'less': '@bg-overlay',
            }]

        }, {
            'colorgroup': 'Text Colors',
            'colors': [{
                'name': 'Standard Text',
                'hex': '#5A5A5A',
                'less': '@text-standard',
            }, {
                'name': 'Ghost Text',
                'hex': '#828282',
                'less': '@text-light',
            }, {
                'name': 'Inactive Text',
                'hex': '#A5A5A5',
                'less': '@text-inactive',
            }, {
                'name': 'Lucid Blue Dark',
                'hex': '#2C84B5',
                'less': '@lucid-blue-dark',
            }]

        }];
        return colors;
    });