const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// Entrypunkt: src/index.js
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
// html bygges med utgangspunkt i /public/index.html    
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
/* Hvis URL ikke finnes under react, 
   og starter med /server: Fjern "/server" og let etter URL på localhost, port 3001 
*/
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