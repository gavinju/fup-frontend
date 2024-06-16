const { defineConfig } = require('@vue/cli-service')

const port = process.env.VUE_APP_PORT
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: port,
    host: '0.0.0.0',
    https: false,
    open: true,
    proxy: {
      '/api': {
        // 要代理的地址
        target: 'http://localhost:8096',
        // 配置了这个可以从 http 代理到 https
        // 依赖 origin 的功能可能需要这个，比如 cookie
        changeOrigin: true,
      },
    },
  },
  //关闭eslint
  lintOnSave: false,
})
