const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const isProd = process.env.NODE_ENV == 'production'

const hash = '[hash:7]';

const entry = './src/entry.js';
const devEntry = [
    'webpack/hot/dev-server',
    entry,
];

var plugins = []
if (isProd) { //生产环境
    plugins.push(new webpack.DefinePlugin({
        'process.env': { //设置成生产环境
            NODE_ENV: 'production'
        }
    }))
    plugins.push(new webpack.optimize.UglifyJsPlugin({ //压缩代码
        compress: {
            warnings: false
        }
    }))
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin())
}

plugins.push(
    new htmlWebpackPlugin({
        title: 'Test fosun framework',
        template: path.resolve(__dirname, './src/index.html'),
        inject: 'body',
        minify: isProd ? {
            removeComments: true,
            collapseWhitespace: true
        } : null,
    })
)

module.exports = {
    entry: isProd ? entry : devEntry,
    output: {
        publicPath: '',
        path: path.join(__dirname, 'dist'),
        filename: `main.${hash}.js`
    },
    module: {
        loaders: [{
            test: /\.js(x)*$/,
            exclude: /^node_modules$/,
            loader: 'babel'
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css/,
            exclude: /^node_modules$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.scss/,
            loader: 'style!css?sourceMap!postcss!sass?sourceMap',
        }, {
            test: /\.(png|jpg)$/,
            exclude: /^node_modules$/,
            loader: 'url?limit=2000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
        }, {
            test: /\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
            exclude: /^node_modules$/,
            loader: 'file-loader?name=[name].[ext]'
        }]
    },
    plugins,
    resolve: {
        extensions: ['', '.js', '.vue', '.jsx'], //后缀名自动补全
        alias: {
            vue: 'vue/dist/vue.js' //webpack打包时，需要设置别名
        }
    },
}
