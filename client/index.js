import React from 'react'
import ReactDOM from 'react-dom'
import App from '../src/App'

//render 即渲染dom又增加监听
//hydrate 注水 不渲染dom

ReactDOM.hydrate(App,document.getElementById('content'))