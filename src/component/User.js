import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'
import { Redirect } from 'react-router-dom'

const UserInfo =(props)=>{
    return(
        <div>
            <h3>There is {props.userinfo.title}! the best is {props.userinfo.best}</h3>
            <button onClick={props.logout}>logout</button>
        </div>
    )
}
function User(props){
    // const [count, setCount] = useState(1)
    // console.log(props)
    // useEffect(()=>{
    //     if(!(props.userinfo && props.userinfo.title)){
    //         props.getUserInfo()
    //     }
    // },[])
    return <div>
        {
            (props.isLogin)?<UserInfo {...props}></UserInfo>:<Redirect to='/login'></Redirect>
        }
    </div>
}
User.loadData = (store)=>{
   return store.dispatch(getUserInfo())
}
export default connect(
    state=>({isLogin:state.user.isLogin, userinfo:state.user.userinfo}),
    //{ console.log(state) },
    {getUserInfo,
        logout:()=>({type:'USER/LOGOUT'})
    }
)(User)