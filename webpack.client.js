const path = require('path')

module.exports = {
    mode:'development',
    // devtools:'source-map',
    entry:'./client/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'public')
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
        }]
    }
}