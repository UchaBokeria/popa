/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/views/**/*.{hbs,ts}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#f59e0b',
                    focus: '#e59000',
                    content: '#ffffff',
                },
                secondary: {
                    DEFAULT: '#374151',
                    focus: '#283141',
                    content: '#ffffff',
                },
                accent: {
                    DEFAULT: '#0ea5e9',
                    focus: '#0284c7',
                    content: '#ffffff',
                },
                neutral: {
                    DEFAULT: '#1f2937',
                    focus: '#111827',
                    content: '#ffffff',
                },
                base: {
                    100: '#ffffff',
                    200: '#f3f4f6',
                    300: '#e5e7eb',
                    content: '#1f2937',
                },
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                popaTheme: {
                    primary: '#f59e0b',
                    secondary: '#374151',
                    accent: '#0ea5e9',
                    neutral: '#1f2937',
                    'base-100': '#ffffff',
                    'base-200': '#f3f4f6',
                    'base-300': '#e5e7eb',
                    'base-content': '#1f2937',
                    info: '#3abff8',
                    success: '#22c55e',
                    warning: '#f59e0b',
                    error: '#ef4444',
                },
            },
        ],
    },
};
