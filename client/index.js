import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from '../src/App'
import store from '../src/store/store'
import {Provider} from 'react-redux'

//render 即渲染dom又增加监听
//hydrate 注水 不渲染dom
const Page = <Provider store={store}>
    <BrowserRouter>
        {App}
    </BrowserRouter>
</Provider>
ReactDOM.hydrate(Page,document.getElementById('content'))