const { guessProductionMode } = require("@ngneat/tailwind");

module.exports = {
    prefix: '',
    purge: {
        enabled: guessProductionMode(),
        content: [
            './src/**/*.{html,ts}',
        ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        backgroundColor: (theme) => ({
            ...theme('colors'),
            primary: '#1F0043',
            secondary: '#E50071',
            danger: '#e3342f',
        }),
        cursor: {
            'not-allowed': 'not-allowed',
        },
        extend: {
            backgroundImage: () => ({
                // eslint-disable-next-line max-len
                'header-pattern': 'linear-gradient(to left bottom, rgba(255, 183, 50, 1) 0, rgba(245, 130, 32, 1) 100%)',
            }),
            fontFamily: {
                montserrat: ['Montserrat'],
                raleway: ['Raleway'],
                lato: ['Lato'],
                garamond: ['Garamond'],
            },
            spacing: {
                30: '30rem',
            },
        },
        height: {

            "80v": "80vh",
            "52": "13rem",
            "40": "10rem"
        },
    },
    variants: {
        extend: {
            objectFit: ['hover', 'focus'],
            backgroundImage: ['hover', 'focus', 'responsive'],
            backgroundColor: ['disabled'],
            cursor: ['hover', 'focus', 'disabled'],
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
};