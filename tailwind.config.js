/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F7F6F3',
        foreground: '#111111',
        accent: '#8B0000',
        success: '#4A7C59',
        warning: '#B8860B',
        muted: {
          DEFAULT: '#E8E6E1',
          foreground: '#6B6B6B',
        },
        border: '#D4D0C8',
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      spacing: {
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '10': '40px',
        '16': '64px',
      },
      lineHeight: {
        'relaxed': '1.6',
        'loose': '1.8',
      },
      maxWidth: {
        'text': '720px',
      },
    },
  },
  plugins: [],
}
