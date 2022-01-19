const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const mock = require(path.resolve(__dirname, "src/mock"))
const SRC_PATH = path.resolve(__dirname, "src");
const DIST_PATH = path.resolve(__dirname, "dist");
const bodyParser = require('body-parser')
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.mod\.less$/;

module.exports = {
    entry: {
        main: ["babel-polyfill", path.resolve(SRC_PATH, "app")],
    },
    output: {
        path: DIST_PATH,
        publicPath: "/",
        filename: "scripts/[name].[hash].js",
        chunkFilename: "scripts/[name].[chunkhash].js",
    },
    devServer: {
        contentBase: "dist",
        open: true,
        //热更新
        hot: true,
        overlay: true,
        historyApiFallback: true,
        disableHostCheck: true,
        after: function (app) {
            app.use(bodyParser.json())
            Object.entries(mock).forEach(([url, data]) => {
                app.post(url, function (req, res) {
                    // 请求成功返回数据
                    if (data instanceof Function) {
                        res.json(data(req))
                    } else {
                        res.json(data)
                    }
                });
            })
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: lessRegex,
                exclude: lessModuleRegex,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                        },
                    },
                    {
                        loader: "style-resources-loader",
                        options: {
                            patterns: path.resolve(
                                __dirname,
                                "src/styles/common/variables.less"
                            ),
                        },
                    },
                ],
                sideEffects: true,
            },

            {
                test: lessModuleRegex,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                getLocalIdent: getCSSModuleLocalIdent,
                            },
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            javascriptEnabled: true,
                        },
                    },
                    {
                        loader: "style-resources-loader",
                        options: {
                            patterns: path.resolve(
                                __dirname,
                                "src/styles/common/variables.less"
                            ),
                        },
                    },
                ],
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                issuer: {
                    test: /\.jsx?$/
                },
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: '@svgr/webpack',
                        options: {
                            babel: false,
                            icon: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                //多个loader需要从后到前进行解析(大于1000kb打包)
                use: ["url-loader?limit=1000&name=images/[name]-[hash:8].[ext]"],
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            }
        ],
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            chunks: ["main"],
            inject: "body",
        }),
    ],
    resolve: {
        alias: {
            '@': SRC_PATH,
            '@app': path.resolve(SRC_PATH, "components/app")
        }
    },
    node: {
        module: "empty",
    },
};
