module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // adjust the path according to your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake', 'forest', 'emerald', 'corporate'], // Add themes you want to use
  },
}