import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter} from 'react-router-dom'
import App from '../src/App'
import store from '../src/store/store'
import {Provider} from 'react-redux'

const app = express()
app.use(express.static('public'))
app.get('*',(req,res)=>{
    // const Page = <App title='kaikeba'></App>
    //把react解析成HTML
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                {App}
            </StaticRouter>
        </Provider>
    )
    res.send(`
    <html>
        <head>
            <meta charset='utf-8'/>
            <title>react ssr</title>
        </head>
        <body>
            <div id='content'>${content}</div>
            <script src='/bundle.js'></script>
        </body>
    </html>
    `)
})

app.listen(8081,()=>{
    console.log('启动成功')
})