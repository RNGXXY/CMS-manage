const PATH = require('path')
//
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development', // 打包模式：production，development，none
    // 入口 打包的入口文件，模块化的根模块
    entry: {
        main: ['./src/javascripts/app'],
    },
    // 出口
    output: {
        filename: '[name].js', // 打包输出文件的名字
        // 输出路径，路径以配置文件为基准的
        path: PATH.resolve(__dirname, '../dev')
    },
    devServer: { // 开发服务器 http-server（webserver） 依赖 webpack-dev-server
        // 让服务器从这两个目录中响应资源
        // contentBase: [PATH.join(__dirname, "../dev"), PATH.join(__dirname, "../public")],
        // host: "10.9.189.194",
        // 指定服务器从哪里响应资源
        contentBase: [PATH.join(__dirname, "../dev")],
        compress: true,
        port: 9000,
        proxy: { // 代理api请求到 api server
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true
            }
        }
    },
    plugins: [ // 实现某些特定的功能
        // 可以打包html文件 如果实现多页面开发的话，就需要使用多个 HtmlWebpackPlugin
        new HtmlWebpackPlugin({ 
            template: './src/index.html',
            filename: 'index.html',
            // chunks: ['main']
        }),
        // new HtmlWebpackPlugin({ 
        //     template: './src/login.html',
        //     filename: 'login.html',
        //      chunks: ['login']
        // }),
        // 将静态资源目录复制到开发输出目录
        new CopyWebpackPlugin([{ 
            from: PATH.resolve(__dirname, '../static'),
            to:  PATH.resolve(__dirname, '../dev/static')
        }])
    ],
    module: {
        rules: [ // 可以设置模块的规则来为这些模块使用loader
            // {
            //     test: /\.css$/,
            //     use: [ // loader从后向前使用
            //         { loader: 'style-loader' },
            //         { loader: 'css-loader' }                    
            //     ]
            // },
            {
                test: /\.(css|scss)$/,
                use: [ // loader从后向前使用
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },                    
                    { loader: 'sass-loader' }                    
                ]
            },
            {
                test: /\.html$/,
                use: [ // loader从后向前使用
                    { loader: 'string-loader' }                
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
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

// 单入口 单出口： entry： 入口文件的路径 string， output指定输出名字
// 多入口 单出口： entry： [入口文件的路径...] array， output指定输出名字
// 多入口 多出口（一个入口对应一个出口）： entry： { name1: '', name2: ['', '']  } object， output 不能指定名字[name].js