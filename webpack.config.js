var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var extension_dir = './extension/';

module.exports = [
  {
    entry: {
      includes: './js/includes.js',
      background: './js/background.js'
    },
    output: {
      path: extension_dir + '/js/',
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: path.join(__dirname, 'es6'),
          loader: 'babel-loader',
          query: {
            presets: 'es2015'
          }
        }
      ]
    },
    plugins: [
      // Avoid publishing files when compilation fails
      new webpack.NoErrorsPlugin(),
      new CopyWebpackPlugin([
        {from: './manifest.json', to: '../manifest.json'},
        {from: './background.html', to: '../background.html'}
      ])
    ]
  },
  {
    entry: './scss/includes.scss',
    output: {
      path: extension_dir + '/css/',
      filename: 'includes.css'
    },
    module: {
      loaders: [
        {
          test: path.join(__dirname, "./scss"),
          loader: 'style-loader!css-loader!sass-loader'
        }
      ]
    }
  }
];