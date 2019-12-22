import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import routes from '../src/App'
import Header from '../src/component/Header'
import {getClientStore} from '../src/store/store'
import {Provider} from 'react-redux'
import StyleContext from 'isomorphic-style-loader/StyleContext'

//render 即渲染dom又增加监听
//hydrate 注水 不渲染dom
const Page = <Provider store={getClientStore()}>
    <BrowserRouter>
        <Header></Header>
        <Switch>
            {routes.map(route=><Route {...route}></Route>)}
        </Switch>
    </BrowserRouter>
</Provider>
if(window._context){
    const insertCss = (...styles) => {
        const removeCss = styles.map(style => style._insertCss())
        return () => removeCss.forEach(dispose => dispose())
    }
    ReactDOM.hydrate(<StyleContext.Provider value={{ insertCss }}>
    <Page/>
  </StyleContext.Provider>,document.getElementById('content'))
}else{
    ReactDOM.render(Page,document.getElementById('content'))
}