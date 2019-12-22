import React from 'react'
import {Route} from 'react-router-dom'
import About from './container/About'
import Index from './container/Index'
import User from './component/User'
// import './App.css'
import NotFound from './container/NotFound'
import Login from './container/Login'

// export default <div>
//     <Route exact path='/' component={Index}></Route>
//     <Route exact path='/about' component={About}></Route>
// </div>

export default [
    {
        path:'/',
        key:'index',
        component:Index,
        exact:true
    },
    {
        path:'/about',
        key:'about',
        component:About,
        exact:true
    },
    {
        path:'/user',
        key:'user',
        component:User,
        exact:true
    },
    {
        path:'/login',
        key:'login',
        component:Login,
        exact:true
    },
    {key:'404',component:NotFound}
]