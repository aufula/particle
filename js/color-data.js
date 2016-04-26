angular.module('lucidColors', [])
    .factory('lucidColorFactory', function() {

        var colors = [{
            'colorgroup': 'Brand Colors',
            'colors': [{
                'hex': '#3D4752',
                'less': '@blue-steel',
                'description': 'Base color for headers and brand elements'
            }, {
                'hex': '#77818C',
                'less': '@blue-steel-2',
                'description': 'Used for sub headers, icons, and some selected states'
            }, {
                'hex': '#29AAE1',
                'less': '@lucid-blue',
                'description': 'Brand color, used for most active states and action hints'
            }, {
                'hex': '#FC8D2A',
                'less': '@lucidchart-orange',
                'description': 'Brand color, use sparingly.'
            }, {
                'hex': '#8CBF3F',
                'location': 'Press Logo',
                'less': '@lucidpress-green',
                'description': 'Brand color, used mostly for success states or Press elements.'
            }, ]
        }, {
            'colorgroup': 'UI Colors',
            'colors': [{
                'hex': '#F0F0F0',
                'less': '@grey-1',
                'light': 'light',
                'description': 'Always begin with this grey before using darker colors'
            }, {
                'hex': '#E6E6E6',
                'less': '@grey-2',
                'light': 'light',
                'description': 'Used when contrast is needed between from a @grey-1 panel'
            }, {
                'hex': '#D6D6D8',
                'less': '@grey-3',
                'light': 'light',
                'description': 'Alternate grey for added contrast'
            }, {
                'hex': '#CDCED1',
                'less': '@grey-4',
                'light': 'light',
                'description': 'Alternate grey for added contrast'
            }, {
                'hex': '#A5A5A5',
                'less': '@grey-5',
                'description': 'Darkest grey for backgrounds and maximum contrast'
            }]
        }, {
            'colorgroup': 'Information Colors',
            'colors': [{
                'hex': '#ED6058',
                'less': '@info-red',
                'description': 'Use for negative and error states'
            }, {
                'hex': '#FBDCDA',
                'less': '@info-red-light',
                'light': 'light',
                'description': 'Often used as a background with an @info-red icon in foreground'
            }, {
                'hex': '#29AAE1',
                'less': '@info-blue',
                'description': 'Same as @lucid-blue, but renamed for easy usage with info colors'
            }, {
                'hex': '#D2EDF9',
                'less': '@info-blue-light',
                'light': 'light',
                'description': 'Often used as a background with an @info-blue icon in foreground'
            }, {
                'hex': '#8CBF3F',
                'less': '@info-green',
                'description': 'Same as @lucidpress-green, but renamed for easy usage'
            }, {
                'hex': '#E9F2D9',
                'less': '@info-green-light',
                'light': 'light',
                'description': 'Often used as a background with an @info-green icon in foreground'
            }, {
                'hex': '#FCC438',
                'less': '@info-yellow',
                'light': 'light',
                'description': 'Used for cautionary or paused states'
            }]
        }, {
            'colorgroup': 'Secondary Colors',
            'colors': [{
                'hex': '#212C35',
                'less': '@blue-steel-dark',
                'description': 'This was developed to be darker on retina phones, use with caution'
            }, {
                'hex': '#AFB7BF',
                'less': '@blue-steel-light',
                'light': 'light',
                'description': 'Works nicely with text and icons on top of @blue-steel elements'
            }, {
                'hex': '#D2D2D2',
                'less': '@grey-border',
                'light': 'light',
                'description': 'Use to separate similar, related components in the same area'
            }, {
                'hex': '#A5A5A5',
                'less': '@grey-border-dark',
                'description': 'Use to dileneate separate, unrelated or large portion of the interface'
            }, {
                'hex': 'rgba(69, 75, 82, 0.4)',
                'less': '@bg-overlay',
                'description': 'The color used behind modals. Pay attention to opacity'
            }]

        }, {
            'colorgroup': 'Text Colors',
            'colors': [{
                'name': 'Standard Text',
                'hex': '#5A5A5A',
                'less': '@text-standard',
                'description': 'Used for almost all text and body copy'
            }, {
                'name': 'Ghost Text',
                'hex': '#828282',
                'less': '@text-light',
                'description': 'Used often with inactive or zero  states and secondary text'
            }, {
                'name': 'Inactive Text',
                'hex': '#A5A5A5',
                'less': '@text-inactive',
                'description': 'Most used as the placeholder text for inputs'
            }, {
                'name': 'Lucid Blue Dark',
                'hex': '#2C84B5',
                'less': '@lucid-blue-dark',
                'description': 'Mostly used for hyperlinks, @lucid-blue isn\'t dark enough'
            }]

        }];
        return colors;
    });