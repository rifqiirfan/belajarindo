import { shadcnPreset } from '@shadcn/ui/preset'

/** @type {import('@shadcn/ui').UserConfig} */
export default shadcnPreset({
  // extend the theme's color palette
  theme: {
    extend: {
      fonts:{
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
    },
  },
})