const path = require("path");
const PreactRefreshPlugin = require('@prefresh/webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { runtime: "automatic", importSource: "preact" },
              ],
              require.resolve("@prefresh/babel-plugin"),
            ],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new PreactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: true,
  },
};
