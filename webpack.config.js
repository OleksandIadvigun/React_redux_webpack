const path = require('path');
const HTMPWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        main: ['@babel/polyfill', './index.js']
    },
    output: {
        filename: "[name].[hash].js",
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', 'json', '.png']
    },
    optimization: {
        splitChunks: {
            chunks: "all"
        }
    },
    devServer: {
        port: 3200,
        historyApiFallback: true
    },
    plugins: [
        new HTMPWebpackPlugin(
            {
                template: "./index.html"
            }
        ),
        new CleanWebpackPlugin(),

    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        "plugins": [
                            "react-require"
                        ]
                    }
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
