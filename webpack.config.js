const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const fs = require('fs')
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin')

// Compile all pug files
let folder = 'src/pug/pages/'
let folderLength = folder.length
let templates = []

const traverseDir = dir => {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);

    // If it has subfolder
    if (fs.lstatSync(fullPath).isDirectory()) {
      // Call function recursively
      traverseDir(fullPath);
    } else {
      let extractPath = folderLength
      let extractPugExt = fullPath.indexOf('.pug')
      let extractFile = fullPath.substring(extractPath, extractPugExt)
        templates.push(
          new HtmlWebpackPlugin({
            favicon: './src/img/icon.png',
            template: fullPath,
            filename: extractFile + '.html',
            inject: true
          })
        )
     }
  })
}

traverseDir(folder)

const devMode = process.env.NODE_ENV !== 'production'
const outPutSass = devMode ? 'expanded' : 'compressed'

module.exports = {
  entry: {
    js: './src/js/index.js'
  },
  output: {
    filename: '[name].[hash].js',
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
          },
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
                browser: ['last 2 versions'],
              },
              sourceMap: true,
              plugins: () => [autoprefixer]
            }
          },
          'resolve-url-loader',
          `sass-loader?outputStyle=${outPutSass}&sourceMap`
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
    new CleanWebpackPlugin('dist'),
    ...templates,
    new HtmlWebpackPugPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    }),
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
    }),
  ]
}
