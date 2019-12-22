const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode:'development',
    // devtools:'source-map',
    entry:'./client/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'public')
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.csr.html',
            template:'src/index.csr.html',
            inject:true
        })
    ],
    module:{
        rules:[{
            test:/\.js$/,
            loader:'babel-loader',
            exclude:/node_modules/,//排除node_modules
            options:{
                presets:['@babel/preset-react',['@babel/preset-env']]
                //支持jsx语法、支持es6语法
            }
        },
        {
            test:/\.css$/,
            use:['style-loader',{
                loader:'css-loader',
                options:{
                    modules: {
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    }
                }
            }]
        }
        ]
    }
}