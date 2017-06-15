//webpack.config.js

var webpack = require('webpack');
var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    devtool: "eval-source-map",

    entry: [
        './src/entry.js'
    ],

    output: {
        path: path.resolve(__dirname, './out'),
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            }
        ]
    }

    /*
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react-pulldown-refresh',
            template: './src/index.tpl.html',
            filename: 'index.html'
        })
    ] */
};
