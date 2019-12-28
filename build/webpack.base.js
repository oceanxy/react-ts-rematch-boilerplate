const path = require('path');
const argv = require('yargs').argv;
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');
const getClientEnvironment = require('./env');

const APP_PATH = path.resolve(__dirname, '../src');

const bundleAnalyzerReport = argv.report;
const env = getClientEnvironment(config.publicPath);

const webpackConfig = {
  plugins: []
};
if (bundleAnalyzerReport) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: true,
    reportFilename: path.join(config.assetsRoot, './report.html')
  }));
}

module.exports = merge(webpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './src/index.ts',
    vendor: ['react', 'react-dom'] // 不变的代码分包
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: config.assetsRoot,
    publicPath: config.publicPath
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        include: [APP_PATH],
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          emitError: true,
          fix: true // 是否自动修复
        }
      },
      {
        oneOf: [
          {
            test: /\.(html)$/,
            loader: 'html-loader'
          },
          {
            test: /\.([jt])s[x]?$/,
            include: APP_PATH,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'awesome-typescript-loader',
                options: {
                  silent: true
                }
              }
            ]
          },
          {
            test: /\.(scss|css)$/,
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 2
                }
              },
              'postcss-loader',
              {
                loader: 'sass-loader'
              }
            ]
          },
          {
            test: /\.svg$/,
            use: ['@svgr/webpack']
          },
          {
            test: /\.(jpg|jpeg|bmp|png|webp|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: 'img/[name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          },
          {
            exclude: [/\.(js|mjs|ts|tsx|less|css|jsx)$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'media/[path][name].[hash:8].[ext]',
              outputPath: config.assetsDirectory,
              publicPath: config.assetsRoot
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: config.indexPath,
      showErrors: true
    }),
    // 在html模板中能够使用环境变量
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin(env.raw),
    // 在js代码中能够使用环境变量(demo: process.env.NODE_ENV === 'production')
    new webpack.DefinePlugin(env.stringified),
    // 忽略moment的国际化库
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    new CopyWebpackPlugin([
      {
        from: 'public',
        ignore: ['index.html']
      }
    ])
  ],
  optimization: {}
});
