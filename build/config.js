const path = require('path');

module.exports = {
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsDirectory: 'static',
  publicPath: '/',
  indexPath: path.resolve(__dirname, '../public/index.html'),
  productionJsSourceMap: false,

  devServer: {
    openPage: 'clbs/talkback/kanBanPage', // 启动devServer后自动跳转到的路由。同src/config/index.ts 的basename字段
    host: 'localhost',

    port: 3001,
    contentBase: path.join(__dirname, '../public'),
    watchContentBase: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    clientLogLevel: 'error',
    open: true,
    overlay: false,
    quiet: false,
    noInfo: false,
    watchOptions: {
      ignored: /node_modules/
    },
    proxy: {
      '/clbs/web/v1/dispatch/*': {
        target: 'http://localhost:8080/',
        changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false          // 设置支持https协议的代理
      }
    }
  }
};
