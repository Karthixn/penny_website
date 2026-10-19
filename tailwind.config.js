/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B10',
        surface: {
          DEFAULT: '#171720',
          light: '#22222E',
          hover: '#1D1D28',
        },
        primary: {
          DEFAULT: '#5A46F5',
          light: '#7C6FF7',
          dark: '#4433D4',
          lavender: '#A78BFA',
        },
        brand: {
          purple: '#5A46F5',
          violet: '#7C6FF7',
          lavender: '#A78BFA',
          dark: '#0B0B10',
          surface: '#171720',
          white: '#F7F7FB',
        },
        accent: '#7C6FF7',
        success: '#00D68F',
        expense: '#EF4444',
        warning: '#F2994A',
        border: {
          DEFAULT: '#262636',
          subtle: '#1C1C26',
        },
        textLight: '#F7F7FB',
        textMuted: '#9496A8',
        textDark: '#5E6074',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'purple-glow': '0 0 50px -12px rgba(124, 111, 247, 0.4)',
        'purple-subtle': '0 0 30px -10px rgba(90, 70, 245, 0.25)',
        'card-elevated': '0 12px 32px -8px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
