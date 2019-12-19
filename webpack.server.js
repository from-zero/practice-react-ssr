const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    target:'node', //标记是node环境的,使用require加载chunk
    mode:'development',
    //打包时排除node_modules中的所有模块
    externals:[nodeExternals()],
    entry:'./server/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'build')
    },
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
            use:['css-loader']//'isomorphic-style-loader',
        }
        ]
    }
}