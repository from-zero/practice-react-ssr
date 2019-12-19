import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter,Route,matchPath} from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'
import {getServerStore} from '../src/store/store'
import {Provider} from 'react-redux'
import axios from 'axios'
import proxy from 'http-proxy-middleware'

const app = express()
const store = getServerStore()
app.use(express.static('public'))
let sum = 0;
app.get('/api', proxy({target:'http://localhost:8082', changeOrigin:true}))
app.get('*',(req,res)=>{
    // const Page = <App title='kaikeba'></App>
    //把react解析成HTML
    const promises = []
    routes.some(route=>{
        const match = matchPath(req.url, route);
        if(match && route.component.loadData){
            const myPromise = new Promise((resolve)=>{
                    route.component.loadData(store)
                        .then(resolve)
                        .catch(e=>{console.log(e); resolve()})
            })
            promises.push(myPromise)
        } 
    })

    Promise.all(promises).then(()=>{
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <Header></Header>
                    {routes.map(route=><Route {...route}></Route>)}
                </StaticRouter>
            </Provider>
        )
        console.log('from server'+sum++)
        res.send(`
        <html>
            <head>
                <meta charset='utf-8'/>
                <title>react ssr</title>
                <link rel="icon" href="data:;base64,=">
            </head>
            <body>
                <div id='content'>${content}</div>
                <script>
                    window.__context = ${JSON.stringify(store.getState())}
                </script>
                <script src='/bundle.js'></script>
            </body>
        </html>
        `)
    })
})

app.listen(8081,()=>{
    console.log('启动成功')
})