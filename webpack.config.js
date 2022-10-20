const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { loader } = require("mini-css-extract-plugin");

module.exports = {
  entry: `./source/index.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `build`),
  },
  devServer: {
    contentBase: path.join(__dirname, `build`),
    open: false,
    port: 1337,
    historyApiFallback: true,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.((s)css)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            sourceMap: true,
          }
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles SASS to CSS
        }]
      },
      {
        test: /\.(woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "fonts/"
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg)$/,
        loader: 'url-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/source/index.html",
      inject: "body",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: "./source/images", to: "images" },
    //   ],
    // }),
    new MiniCssExtractPlugin()
  ],
};
