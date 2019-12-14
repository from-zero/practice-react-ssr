import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter,Route,matchPath} from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'
import {getServerStore} from '../src/store/store'
import {Provider} from 'react-redux'

const app = express()
const store = getServerStore()
app.use(express.static('public'))
app.get('*',(req,res)=>{
    // const Page = <App title='kaikeba'></App>
    //把react解析成HTML
    const promises = []
    routes.some(route=>{
        const match = matchPath(req.url, route);
        if(match && route.component.loadData) promises.push(route.component.loadData(store))
    })

    let sum = 0;
    const checkReady = ()=>{
        sum ++;
        if(sum == promises.length) sendMsg()
    }
    const sendMsg = ()=>{
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <Header></Header>
                    {routes.map(route=><Route {...route}></Route>)}
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
                <script>
                    window.__context = ${JSON.stringify(store.getState())}
                </script>
                <script src='/bundle.js'></script>
            </body>
        </html>
        `)
    } 
    if(promises.length == 0) sendMsg()
    else 
        promises.forEach(p=>{
            let f = false;
            // sendMsg()
            p.then(()=>{
                f=true;
                checkReady()
            }).catch(()=>{
                if(!f){
                checkReady() 
                }
            })
        })
})

app.listen(8081,()=>{
    console.log('启动成功')
})