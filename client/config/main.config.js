const path = require('path');
const { ROOT_DIR } = require('./common');
const webpack = require('webpack');

const mainConfig = {
  entry: { 
    main: path.join(ROOT_DIR, 'src/main/index.tsx')
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.join(ROOT_DIR, 'dist/electron')
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  plugins: [
    // new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      STATIC: `${path.join(ROOT_DIR, 'static').replace(/\\/g, '\\\\')}`
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', 'js'],
    alias: {
      '@main': path.resolve(ROOT_DIR, 'src/main')
    }
  },
  target: 'electron-main'
}

module.exports = mainConfig;