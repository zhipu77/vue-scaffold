'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const minPostfix = isProd ? '.min' : '';
const minify = isProd ? 'minimize' : '';
const hash = '[hash:7]';

const entry = './src/entry.js';
const devEntry = [
    'webpack/hot/dev-server',
    entry,
];

const basePlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
        title: 'Test fosun framework',
        template: path.resolve(__dirname, './src/index.html'),
        inject: 'body',
        minify: isProd ? {
            removeComments: true,
            collapseWhitespace: true
        } : null,
    }),
];

const envPlugins = isProd ? [
    new ExtractTextPlugin(`css/style.${hash}${minPostfix}.css`, {
        allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.BannerPlugin(`build:${new Date().toString()}`),
] : [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
];

module.exports = {
    debug: !isProd,
    devtool: !isProd ? '#eval' : null,
    entry: isProd ? entry : devEntry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: `js/main.${hash}${minPostfix}.js`,
        publicPath: ''
    },
    resolve: {
        extensions: ['.vue', '.scss', '.css', '', '.js']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: [
                'babel',
                // 'eslint',
            ],
            include: [
                path.join(__dirname, 'src/'),
            ]
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.scss/,
            loader: isProd ? ExtractTextPlugin.extract(
                'style',
                `css?${minify}!postcss!sass`
            ) : 'style!css?sourceMap!postcss!sass?sourceMap',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.jpe?g$|\.gif$|\.png|\.ico$/,
            loaders: [
                'file?name=[path][name].[ext]&context=app',
                // 'image-webpack'
            ]
        }, {
            test: /\.txt$|\.json$|\.webapp$/,
            loader: 'file?name=[path][name].[ext]&context=app'
        }, {
            test: /\.svg$/,
            loader: 'url?mimetype=image/svg+xml&name=[name].[ext]'
        }, {
            test: /\.woff$/,
            loader: 'url?mimetype=application/font-woff&name=[name].[ext]'
        }, {
            test: /\.[ot]tf$/,
            loader: 'url?mimetype=application/octet-stream&name=[name].[ext]'
        }, ]
    },

    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },

    plugins: basePlugins.concat(envPlugins),
    /*
        // global mode
        externals: {
            'zepto': 'Zepto',
        },*/

    // loader config
    postcss: [autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'ie 10'] })],

    // @see https://www.npmjs.com/package/image-webpack-loader
    imageWebpackLoader: {}
}
