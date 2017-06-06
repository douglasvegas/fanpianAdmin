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
//判断当前运行环境
const nodeEnv = process.env.NODE_ENV || 'development';

var config = {
    context: path.resolve(__dirname,"src"),
    entry: {
        index: ['./index.js'],
        vendors:['react','react-dom']
    },
    output: {
        filename: '[name].[chunkhash:8].js',
        //输出的打包文件
        path: buildPath,

        publicPath: './',
        //如果修改成／assets/，那么访问路径为 localhost:8080/assets/index.html
        //bundle路径为 /assets/bundle.js
        // 对于热替换(HMR)是必须的，让 webpack 知道在哪里载入热更新的模块(chunk)
        //chunkFilename: 'bundle.js'
    },

    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js','.jsx','.scss','.css'],
        modules: [
            path.resolve(__dirname,'node_modules'),
            path.join(__dirname, './src')
        ],
        alias: {
            'react.js': pathToReact,
            'react-dom.js': pathToReactDOM 
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [ 'babel-loader', ],
                exclude: path.resolve(__dirname,'node_modules'),
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader?modules','sass-loader']
                })
            }

                ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify(nodeEnv),
            },
            BASE_URL: JSON.stringify('http://localhost:8081/')
        }),
        new ExtractTextPlugin("index.[contenthash:8].css"),
        new WebpackMd5Hash(),
        //压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'admin.html', //相对于path路径，待修改的html文件
            template: 'index.html', //html模版路径
            inject: true, //允许插件修改的内容
            //chunks:['bundle'], //加载指定模块、否则加载所有模块
            hash: false, //为静态资源生产hash
            minify: { //压缩HTML文件
                removeComments: true,
                collapseWhitespace: true //删除空白符与换行符
            }

        }),
        new CleanWebpackPlugin(
            ['dist/*.js','dist/index.*.css','dist/*.html'], //匹配文件
            {
                root: __dirname, //根目录
                verbose: true, //开启在控制台输出信息
                dry: false //启用删除文件
            }
        )
    ]
}

module.exports = config;