// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
  mode: "development",
  devtool: 'source-map',
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    library: {
      // 对应浏览器使用script访问的时候的名字
      name: '_',
      // 产出的模块化方案
      type: 'umd'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  // 将第三方库排除在打包系统
  // externals: {
  //   lodash: {
  //     commonjs: "lodash",
  //     commonjs2: "lodash",
  //     amd: "lodash",
  //     root: "_",
  //     }
  // },
  // 排除所有node_modules模块
  externals: [nodeExternals()],
  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
};
