const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve:
    {
        extensions: ['.js', '.jsx'],
    },
    plugins: 
    [
        new HtmlWebpackPlugin({
        template: './public/index.html',
        }),
    ],
    devServer: 
    {
        static: 
        {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy:
        [
            {
                context: ['/server'],
                target: 'http://localhost:3001',
                pathRewrite: { '^/server': '' },
            },
        ],
    },
};