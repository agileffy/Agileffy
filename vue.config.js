module.exports = {
  runtimeCompiler: true,

  pwa: {
    name: 'Agileffy'
  },

  assetsDir: 'static',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://172.20.10.3:5000',
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/api': '/api',
        },
      }
    },
  },
}