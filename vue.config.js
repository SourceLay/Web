module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://localhost/',
        changeOrigin: true,
      }
    }
  }
}