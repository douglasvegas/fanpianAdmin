const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const autoprefixer = require('autoprefixer');
const precss = require('precss');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const nodemodulesPath = path.resolve(__dirname, 'node_modules');
const buildPath = path.resolve(__dirname, 'dist');

const pathToReact = path.resolve(nodemodulesPath,'react/dist/react.min.js');
const pathToReactDOM = path.resolve(nodemodulesPath,'react-dom/dist/react-dom.min.js');

var config;
const devConfig = require('./webpack.dev.js');
const proConfig = require('./webpack.pro.js');

//判断当前运行环境
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

console.log("当前运行环境:",isProduction ?'生产环境':'开发环境');
if (isProduction) {
    module.exports = proConfig;
} else {
    module.exports = devConfig;
}

