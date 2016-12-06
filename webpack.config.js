module.exports = {
  entry: './client/src/index.js',

  output: {
    path: 'client/public/build',
    //publicPath: 'build', had to disable for hot module replacement
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  devtool: 'source-map'
};