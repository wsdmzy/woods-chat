const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { ROOT_DIR } = require('./common')

const rendererConfig = {
  entry: {
    renderer: path.join(ROOT_DIR, 'src/renderer/index.tsx')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(ROOT_DIR, 'dist/electron')
  },
  plugins: [
    new webpack.DefinePlugin({
      staticPath: `${path.join(ROOT_DIR, 'static').replace(/\\/g, '\\\\')}`
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(ROOT_DIR, 'src/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
    })
  ],
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: {
                localIdentName: "[local]___[hash:base64:5]"
              },
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'images/[name].[ext]'
          }
        }
      },
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@renderer': path.resolve(ROOT_DIR, 'src/renderer')
    },
  },
  devtool: "source-map",
  mode: 'development',
  target: 'electron-renderer'
};

if (process.env.NODE_ENV === 'production') {
  rendererConfig.mode = 'development',
  rendererConfig.devtool = '';
  // ...
}

module.exports = rendererConfig;