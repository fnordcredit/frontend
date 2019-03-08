const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const preBuildScripts = process.env.NO_FLOW == undefined ?
  process.env.FLOW_PATH != undefined ? [process.env.FLOW_PATH] : ['flow']
  : [];

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: ['.js', '.jsx']
  },
  entry:  [
    path.resolve(__dirname, 'src/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { test: /\.(woff2?|eot|ttf|svg|ico)$/, loader: "file-loader" },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPlugin({onBuildStart:preBuildScripts}),
    new HtmlWebpackPlugin({
      title: 'Fnordcredit',
      favicon: 'icons/favicon.ico',
      template: 'index.ejs'
    }),
  ],
  devtool: 'source-map'
};
