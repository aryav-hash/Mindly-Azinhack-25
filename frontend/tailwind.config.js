/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        foreground: 'var(--text)',
        card: 'var(--surface)',
        muted: 'var(--muted)',
        primary: {
          DEFAULT: 'var(--primary)',
          600: 'var(--primary-strong)'
        },
        border: 'var(--border)'
      },
      boxShadow: {
        card: '0 1px 0 rgba(0,0,0,0.02), 0 2px 8px rgba(0,0,0,0.04)'
      },
      borderRadius: {
        lg: '14px'
      }
    }
  },
  plugins: []
};


