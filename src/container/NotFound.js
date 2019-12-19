import React from 'react'
import {Route} from 'react-router-dom'

const Status = ({code, children}) =>{
    return <Route render={({staticContext})=>{
        console.log('status',staticContext)
        if(staticContext){
            staticContext.status = 404;
        }
        return children
    }}></Route>
}

function NotFound (props){
    console.log(props.staticContext)
    return <Status code={404}>
        <div>
            <h1>没找到鸭</h1>
            <img id='img-404' src='/404.png' />
        </div>
    </Status>
}
export default NotFound