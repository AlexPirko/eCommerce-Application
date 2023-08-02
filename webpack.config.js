/* eslint-disable @typescript-eslint/no-var-requires */
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index'),
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/i, use: 'ts-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/source',
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'url-loader',
        type: 'javascript/auto',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          sources: {
            list: [
              {
                attribute: 'src',
                type: 'src',
                filter: (tag) => {
                  return tag.toLowerCase() === 'img';
                },
              },
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    // hashFunction: 'xxhash64',
  },
  plugins: [
    new ESLintPlugin({ extensions: 'ts' }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
