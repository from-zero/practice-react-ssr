import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import App from '../src/App'
const app = express()
app.use(express.static('public'))
app.get('/',(req,res)=>{
    // const Page = <App title='kaikeba'></App>
    //把react解析成HTML
    const content = renderToString(App)
    res.send(`
    <html>
        <head>
            <meta charset='utf-8'/>
            <title>react ssr</title>
        </head>
        <body>
            <div id='content'>${content}</div>
            <script src='/index.js'></script>
        </body>
    </html>
    `)
})

app.listen(8081,()=>{
    console.log('启动成功')
})