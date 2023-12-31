const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DotEnv = require('dotenv-webpack');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index'),
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/i, use: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /.(png|jpg|svg)$/,
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
    plugins: [new TsconfigPathsPlugin({})],
    fallback: {
      process: false,
    },
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new DotEnv(),
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
