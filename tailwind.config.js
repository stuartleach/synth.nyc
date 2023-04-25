/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    content: [],
    theme: {
        extend: {
            colors: {
                'primary': 'green',
                'secondary': 'blue',
                'danger': 'red',
                'success': 'green',
                'warning': 'yellow',
                'info': 'blue',
                'light': 'white',
                'dark': 'black',
                'body': 'white',
            },
            fontFamily: {
                'sans': ['ui-sans-serif', 'system-ui'],
                'serif': ['ui-serif', 'Georgia'],
                'mono': ['ui-monospace', 'SFMono-Regular'],
                'display': ['Oswald'],
                'body': ['Open Sans'],
            }
        },
    },
    plugins: [],
}

