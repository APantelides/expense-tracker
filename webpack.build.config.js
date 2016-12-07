var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'client', 'public', 'build');
var mainPath = path.resolve(__dirname, 'client', 'src', 'index.js');

var config = {

  devtool: 'source-map',
  entry: mainPath,
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: [nodeModulesPath]
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }]
  }
  // plugins: [
  //   new Webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: JSON.stringify('production')
  //     }
  //   }),
  //   new Webpack.optimize.UglifyJsPlugin()
  // ]
};

module.exports = config;