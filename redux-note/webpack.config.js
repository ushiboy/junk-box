const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    js: './src/app.js',
    css: './src/app.css'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader')
      }
    ]
  },
  devServer: {
    contentBase: './public',
    inline: true,
    port: 8080,
    stats: {
      version: false,
      hash: false,
      chunkModules: false
    }
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  postcss: [
    require('postcss-easy-import')({
      glob: true
    })
  ],
  devtool: 'source-map'
};
