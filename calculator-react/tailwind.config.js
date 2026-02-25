/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',      // Indigo vif
        'primary-dark': '#4f46e5', // Indigo foncé
        accent: '#ec4899',        // Rose vif
        secondary: '#8b5cf6',     // Violet
        success: '#10b981',       // Vert émeraude
        warning: '#f59e0b',       // Orange
      },
      animation: {
        'slide-in': 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(99, 102, 241, 0.5)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.6)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.5)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.5)',
      },
    },
  },
  plugins: [],
}
