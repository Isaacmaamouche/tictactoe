const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode:"development",
    entry: './src/js/index.js',  

    plugins: [new MiniCssExtractPlugin({
        filename: "./css/css_bundle.css"
    })],

    module: {
        rules: [
        {
            test: /\.(scss|css)$/i,
            use: [
            // could replace the next line with "style-loader" here for inline css
            MiniCssExtractPlugin.loader,
            // "style-loader",
            "css-loader",
            "postcss-loader",
            // according to the docs, sass-loader should be at the bottom, which
            // loads it first to avoid prefixes in your sourcemaps and other issues.
            "sass-loader",
            ],
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
            // without additional settings, this will reference .babelrc
            loader: "babel-loader",
            },
        },
        ],
    },
    resolve: { extensions: ["*", ".js", ".jsx"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, ''),
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css_bundle.css"
        }), 
        new webpack.HotModuleReplacementPlugin()],

};
