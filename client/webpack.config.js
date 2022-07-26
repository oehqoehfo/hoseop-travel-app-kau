const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const dotenv = require("dotenv");
const CopyWebpackPlugin = require('copy-webpack-plugin');
dotenv.config();
const isDevelopment = process.env.NODE_ENV !== "production";
module.exports = {
    mode: isDevelopment ? "development" : "production",
    entry: "./src/index.tsx",
    devServer: {
      hot: true,
    },
    target: "web",
    output: {
      filename: "bundle.[hash].js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
      isDevelopment && new webpack.HotModuleReplacementPlugin(),
      isDevelopment && new ReactRefreshWebpackPlugin(),
      new webpack.DefinePlugin({
        "process.env":JSON.stringify(process.env)
      }),
      new CopyWebpackPlugin({
        patterns: [
            {
              from:'public/image',
              to:'dist'
            },
            {
              from:'public/style',
              to:'dist'
            }
        ]
    })
    ].filter(Boolean),
    resolve: {
      modules: [__dirname, "src", "node_modules"],
      extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
      rules: [
        {
          test: /\.ts$|tsx/,
          exclude: /node_modules/,
          loader: require.resolve("babel-loader"),
          options: {
            plugins: [
              isDevelopment && require.resolve("react-refresh/babel"),
            ].filter(Boolean),
          },
        },
        {
            test: /\.css$/,
            include: path.resolve(__dirname, 'src'),
            use: ['style-loader', 'css-loader', 'postcss-loader']
        },
        {
          test: /\.png|svg|jpg|gif$/,
          use: ["file-loader"],
        },
      ],
    },
  };