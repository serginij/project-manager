const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const dev = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'linaria/loader',
            options: {
              sourceMap: dev
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== 'production'
            }
          },
          {
            loader: 'css-loader',
            options: { sourceMap: dev }
          }
        ]
      },
      {
        test: /\.(gif|svg|jpg|png)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components/'),
      '@lib': path.resolve(__dirname, '../src/lib'),
      '@symbiotes': path.resolve(__dirname, '../src/symbiotes'),
      '@ui': path.resolve(__dirname, '../src/ui'),
      '@assets': path.resolve(__dirname, '../src/assets')
    },
    extensions: ['.js']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html',
      title: 'Project-manager'
    }),
    new MiniCssExtractPlugin({ filename: 'styles.css' })
  ]
}
