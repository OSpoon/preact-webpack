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
          loader: require.resolve('swc-loader'),
          options: {
            sync: true,
            module: {
              type: 'es6'
            },
            minify: !isDevelopment,
            isModule: true,
            jsc: {
              target: 'es2016',
              parser: {
                syntax: 'ecmascript', // 'typescript' 如果你使用 TypeScript
                jsx: true,
                dynamicImport: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  importSource: 'react',
                  development: isDevelopment,
                  refresh: isDevelopment,
                },
              },
            },
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat', // 必须放在 test-utils 下面
      'react/jsx-runtime': 'preact/jsx-runtime'
    },
    extensions: [".js", ".jsx"],
  },
  plugins: [
    isDevelopment && new (require('@pmmmwh/react-refresh-webpack-plugin'))(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ].filter(Boolean),
  devServer: {
    host: '127.0.0.1',
    allowedHosts: 'all',
    static: path.join(__dirname, "dist"),
    compress: true,
    devMiddleware: {
      writeToDisk: true
    },
    watchFiles: undefined,
    client: {
      logging: isDevelopment === 'development' ? 'error' : 'none',
      progress: false,
      overlay: {
        errors: false,
        warnings: false
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 'auto',
    hot: 'only'
  },
};
