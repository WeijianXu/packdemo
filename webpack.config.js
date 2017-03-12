const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    __dirname + '/src/public/scripts/',
    __dirname + '/src/public/lib/'
  ],
  output: {
    path: __dirname + '/build/byWebpack/',
    filename: '[name].[hash:6].js'
  },
  module: {
    /*loaders: [{
      test: /\.css$/,
      loader: 'style-loader'
    }]*/
  },
  plugins: [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    //将样式统一发布到style.css中
    /*new ExtractTextPlugin("style.css", {
      allChunks: true,
      disable: false
    }),*/
    //使用ProvidePlugin加载使用频率高的模块
    new webpack.ProvidePlugin({
      $: "webpack-zepto"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/views/index.html'
    })
  ],
  resolve: {
    // require时省略的扩展名，如：require('module') 不需要module.js
    extensions: ['js', 'es'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {

    }
  }
};