const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          { loader: path.resolve(__dirname, "../dist/index.js") },
          { loader: path.resolve(__dirname, "../dist/logger_loader.js") }
        ],
      },
      // {
      //   test: /\.js$/,
      //   use: [{ loader: path.resolve(__dirname, "../dist/index_2.js") }],
      // }
    ],
  },
};
