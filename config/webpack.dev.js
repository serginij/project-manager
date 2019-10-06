const base = require('./webpack.base')
const merge = require('webpack-merge')

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    port: 8000
  }
})
