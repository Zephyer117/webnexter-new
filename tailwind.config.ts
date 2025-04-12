import type { Config } from 'tailwindcss'

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        ['fade-in-up']: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ['fade-in-down']: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ['fade-in-left']: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        ['fade-in-right']: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        ['fade-in-up']: 'fade-in-up 0.5s ease-out forwards',
        ['fade-in-down']: 'fade-in-down 0.5s ease-out forwards',
        ['fade-in-left']: 'fade-in-left 0.5s ease-out forwards',
        ['fade-in-right']: 'fade-in-right 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
