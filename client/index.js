import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route} from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'
import {getClientStore} from '../src/store/store'
import {Provider} from 'react-redux'

//render 即渲染dom又增加监听
//hydrate 注水 不渲染dom
const Page = <Provider store={getClientStore()}>
    <BrowserRouter>
        <Header></Header>
        {routes.map(route=><Route {...route}></Route>)}
    </BrowserRouter>
</Provider>
ReactDOM.hydrate(Page,document.getElementById('content'))