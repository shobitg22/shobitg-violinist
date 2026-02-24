import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5f0',
          100: '#f4e8d9',
          200: '#e8cfb1',
          300: '#dab081',
          400: '#cd8f56',
          500: '#c17739',
          600: '#b3612e',
          700: '#954c28',
          800: '#783f27',
          900: '#613622',
        },
        accent: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0d1117',
        },
      },
    },
  },
  plugins: [],
}
export default config
