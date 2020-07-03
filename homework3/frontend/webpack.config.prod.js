const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    devtool: "none",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: ""
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [{ loader: "style-loader"}, {
                    loader: "css-loader",
                    options: {
                        importLoaders: 1,
                        modules: {
                            localIdentName: "[name]__[local]__[hash:base:64:5]"
                        },
                    },
                },
                {
                    loader: "postcss-loader",
                    options: {
                        ident: "postcss",
                        plugins: () => [autoprefixer()],
                    }
                }
            ],
            },
            {
                test: /\.(png|gif|jpe?g)$/,
                loader: "url-loader?limit=5000&name=images/[name].[ext]",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/src/index.html",
            filename: "index.html",
            inject: "body",

        })
    ]
};
