const path = require('path');

module.exports = {
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsDirectory: 'static',
  publicPath: '/',
  indexPath: path.resolve(__dirname, '../public/index.html'),
  productionJsSourceMap: false,

  devServer: {
    openPage: 'clbs/intercom',
    host: 'localhost',

    // host: '192.168.110.69',

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
    proxy: {}
  }
};
