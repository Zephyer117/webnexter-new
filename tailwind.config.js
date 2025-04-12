/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
          light: 'var(--primary-light)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          dark: 'var(--secondary-dark)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          dark: 'var(--accent-dark)',
        },
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-light': 'var(--text-light)',
        border: 'var(--border)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        lg: 'var(--shadow-lg)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(2.5rem)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-right': 'fade-in-right 0.7s ease-out forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 