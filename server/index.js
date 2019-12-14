import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter,Route,matchPath} from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'
import {getServerStore} from '../src/store/store'
import {Provider} from 'react-redux'
import axios from 'axios'

const app = express()
const store = getServerStore()
app.use(express.static('public'))
let sum = 0;
app.get('/api/*', (req,res)=>{
    axios.request({
        method:req.method.toLocaleLowerCase(),
        baseURL:'http://localhost:8082',
        url:req.url,
        data:req.body
    }).then(r=>{
        res.send(r.data)
    }).catch(e=>{
        console.log(e)
    })
})
app.get('*',(req,res)=>{
    // const Page = <App title='kaikeba'></App>
    //把react解析成HTML
    const promises = []
    routes.some(route=>{
        const match = matchPath(req.url, route);
        if(match && route.component.loadData) promises.push(route.component.loadData(store))
    })

    const myPromise = (fn) =>{
        return new Promise((resolve)=>{
            resolve(fn)
            fn.catch(e=>{console.log(e)})
        })
    }
    const t = promises.map(p=>myPromise(p))

    Promise.all(t).then(()=>{
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