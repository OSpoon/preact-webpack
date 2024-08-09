const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * @type import('webpack').Configuration
 */
module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
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
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean),
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
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    open: true,
    hot: true,
    client: { 
      overlay: false 
    },
  },
};
