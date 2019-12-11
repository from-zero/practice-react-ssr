import React from 'react'
import {Route} from 'react-router-dom'
import About from './container/About'
import Index from './container/Index'

export default <div>
    <Route exact path='/' component={Index}></Route>
    <Route exact path='/about' component={About}></Route>
</div>