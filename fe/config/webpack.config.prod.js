const PATH = require('path')

//HtmlWebpackPlugin插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode:'production', //webpack的打包模式：production,distelopment,none
    //入口,打包的入口文件，模块化的跟模块
    entry :{
        main:['./src/javascripts/app'],
        admin:['./src/javascripts/admin'],

    },
    //出口
    output:{
        // filename:'main.js',
        filename:'[name]-[hash:6].js',   //打包输出的文件的名字
        //路径是以配置文件为基准的
        path:PATH.resolve(__dirname,'../dist')   //输出的路径，所有的文件都将输出到dist目录下，包括下面的html
    },
    optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    //HtmlWebpackPlugin配置项，
    plugins:[       //plugins 选项用于以各种方式自定义 webpack 构建过程。实现某些特定的功能
        //HtmlWebpackPlugin是一个类，可以打包html文件
        //如果实现多页面开发，有几个页面就new几个HtmlWebpackPlugin
        new HtmlWebpackPlugin({     
            
            template:'./src/index.html',    //
            filename:'index.html' ,  //输出的文件名
            chunks:['main']   //指定引用那个html文件，如果不知道，在多页面中，每个页面都会引入所有的html
        }),
        new HtmlWebpackPlugin({     
            
            template:'./src/admin.html',    //
            filename:'admin.html',   //输出的文件名
            chunks:['admin']   //指定引用那个html文件，如果不知道，在多页面中，每个页面都会引入所有的html
        }),


        //将静态资源目录复制到开发目录中
        new CopyWebpackPlugin([{
            from: PATH.resolve(__dirname, '../static'),
            to:  PATH.resolve(__dirname, '../dist/static')
        }]),
        // 压缩css，添加版本号
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "styles/[name]-[hash:6].css"
        })
    ],
    module:{
        rules: [ // 可以设置模块的规则来为这些模块使用loader
            {
                test: /\.html$/,
                use: [ // loader从后向前使用
                    { loader: 'string-loader' }
                ]
            },
            {
                test: /\.(css|scss)$/,  //只处理模块中的css/scss
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',  { loader: 'sass-loader'} ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192   //8k以下转为base64，以上输出位一个图片文件
                    }
                  }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                  }
                }
            }
        ]
    }
}