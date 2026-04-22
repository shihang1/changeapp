const { defineConfig } = require('vite')
const react = require('@vitejs/plugin-react')

module.exports = defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  },
  build: {
    target: 'es2020'
  }
})
