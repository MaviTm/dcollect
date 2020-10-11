const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  mode: 'development',
  //entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'dcollect.js'
  },
  plugins: [
    new UglifyJsPlugin({sourceMap: true})
  ],
  watch: true,
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};