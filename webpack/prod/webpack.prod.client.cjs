const { merge } = require("webpack-merge");
const baseConfig = require("../webpack.base.cjs");
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const ROOT_DIR = path.resolve(__dirname, "../../");
const BUILD_DIR = path.resolve(ROOT_DIR, "dist");
const API_DIR = path.resolve(ROOT_DIR, "api");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

const clientConfig = {
  target: "web",
  mode: "production",
  entry: {
    client: "./src/client/index.tsx",
  },
  devtool: false,
  resolve: {
    ...baseConfig.resolve,
  },
  module: {
    ...baseConfig.module,
    rules: [
      {
        test: /\.(css|less|styl|scss|sass|sss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  output: {
    path: path.resolve(BUILD_DIR, "client"),
    publicPath: "/client/",
    // Chunkhash is based on webpack entry point Each entry defined will have it’s own hash.
    // If anything changes for that particular entry point than only corresponding hash will change.
    // :8 is used to done slicing of hashes (eg: 8c4cbfdb instead of 8c4cbfdb91ff93f3f3c5).
    filename: "[name].[chunkhash:8].js",
    chunkFilename: "[name].[chunkhash:8].js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        PUBLIC_API_URL: process.env.PUBLIC_API_URL,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].style.[chunkhash:8].css",
      ignoreOrder: true,
    }),
    new LoadablePlugin({
      outputAsset: false,
      writeToDisk: true,
      filename: `${BUILD_DIR}/loadable-stats.json`,
    }),
    // Add any plugins required here for example: Bundle Analyzer, Copy Plugin etc
  ],
  optimization: {
    runtimeChunk: "single", // creates a runtime file to be shared for all generated chunks.
    splitChunks: {
      chunks: "all", // This indicates which chunks will be selected for optimization.
      automaticNameDelimiter: "-",
      cacheGroups: {
        vendor: {
          // to convert long vendor generated large name into vendor.js
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // minify the css
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false, // It will drop all the console.log statements from the final production build
          },
          compress: {
            drop_console: true, // It will stop showing any console.log statement in dev tools. Make it false if you want to see consoles in production mode.
          },
        },
        extractComments: false,
        exclude: [], // If you want to exclude any files so that it doesn't get minified.
      }),
    ],
  },
};

module.exports = merge(baseConfig, clientConfig);
