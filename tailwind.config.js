/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#8cddffff',
          300: '#349fe6ff',
          400: '#22d3ee',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#646464ff',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        slate: {
          900: '#0f172a',
        },
        purple: {
          500: '#a855f7',
          600: '#9333ea',
          900: '#581c87',
        },
        cyan: {
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        blue: {
          200: '#bfdbfe',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        violet: {
          600: '#7c3aed',
          700: '#6d28d9',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        pink: {
          600: '#db2777',
        },
        green: {
          500: '#22c55e',
          600: '#16a34a',
        },
        yellow: {
          400: '#facc15',
        },
        orange: {
          500: '#f97316',
        },
      },
       animation: {
        'float': 'float 4s infinite ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg) scale(1)' 
          },
          '33%': { 
            transform: 'translateY(-20px) rotate(120deg) scale(1.1)' 
          },
          '66%': { 
            transform: 'translateY(10px) rotate(240deg) scale(0.9)' 
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backdropBlur: {
        '2xl': '72px',
      },
      borderRadius: {
        '2.5xl': '1.25rem',
      },
    },
  },
  plugins: [],
}