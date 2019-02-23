const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const fs = require('fs')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

let templates = [];
let dir = './src/pug/pages';
let files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.match(/\.pug$/)) {
    let filename = file.substring(0, file.length - 4);
    templates.push(
      new HtmlWebpackPlugin({
        favicon: './src/img/icon.png',
        template: dir + '/' + filename + '.pug',
        filename: filename + '.html',
        inject: true
      })
    );
  }
});


module.exports = {
  entry: {
    js: './src/js/index.js'
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: false
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              basedir: path.join(__dirname, './src/pug')
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browser: ['last 2 versions']
              },
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          'resolve-url-loader',
          'sass-loader?outputStyle=compressed&sourceMap'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: [
          'file-loader?name=assets/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(ttf|eot|woff2?|mp4|mp3|txt|xml|pdf)$/i,
        use: 'file-loader?name=assets/[name].[ext]&publicPath=assets'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/**/*.*']),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      // filename: 'output.css',
      chunkFilename: '[id].css'
    }),
    ...templates,
    new HtmlWebpackPugPlugin(),
    // new HtmlWebpackPlugin({
    //   favicon: './src/img/icon.png',
    //   template: './src/pug/index.pug',
    //   filename: 'index.html',
    //   inject: true,
    //   chunks: ['js'],
    //   minify: {
    //     html5: true,
    //     collapseWhitespace: true,
    //     caseSensitive: true,
    //     removeComments: true
    //   }
    // }),
    new CopyWebpackPlugin([
      {from:'./src/img',to:'assets'}
    ]),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality:  75
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      strict: true
    })
  ]
}
