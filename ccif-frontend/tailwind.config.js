export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 34px rgba(34, 211, 238, 0.18)',
        panel: '0 18px 60px rgba(0, 0, 0, 0.32)'
      },
      animation: {
        pulseSlow: 'pulse 3s ease-in-out infinite',
        scan: 'scan 4s linear infinite'
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    }
  },
  plugins: []
}
