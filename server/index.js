import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import {StaticRouter,Route,matchPath,Switch} from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'
import {getServerStore} from '../src/store/store'
import {Provider} from 'react-redux'
import axios from 'axios'
import proxy from 'http-proxy-middleware'
import path from 'path'
import fs from 'fs'
import StyleContext from 'isomorphic-style-loader/StyleContext'

const app = express()
const store = getServerStore()
app.use(express.static('public'))
app.use('/api', proxy({target:'http://localhost:8082', changeOrigin:true}))

function csrRender(res){
    console.log(process.cwd())
    const filename = path.resolve(process.cwd(),'public/index.csr.html')
    const html = fs.readFileSync(filename,'utf-8')
    return res.send(html)
}
app.get('*',(req,res)=>{

    if(req.query._mock){
        return csrRender(res);
    }
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
        const context = {
            css:[]
        }
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Header></Header>
                    <Switch>
                        {routes.map(route=><Route {...route}></Route>)}

                    </Switch>
                </StaticRouter>
            </Provider>
        )
        console.log('from server',context)
        if(context.status){
            res.status(context.status)
        }
        if(context.action === 'REPLACE'){
            res.redirect(301,context.url)
        }
        const css = context.css.join('\n')
        res.send(`
        <html>
            <head>
                <meta charset='utf-8'/>
                <title>react ssr</title>
                <style>${css}</style>
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