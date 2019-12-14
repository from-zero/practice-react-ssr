import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getUserInfo} from '../store/user'

function User(props){
    const [count, setCount] = useState(1)
    // console.log(props)
    // useEffect(()=>{
    //     if(!(props.userinfo && props.userinfo.title)){
    //         props.getUserInfo()
    //     }
    // },[])
    return <div>
        <h3>There is {props.userinfo.title}! the best is {props.userinfo.best}</h3>
    </div>
}
User.loadData = (store)=>{
   return store.dispatch(getUserInfo())
}
export default connect(
    state=>({userinfo:state.user.userinfo}),
    //{ console.log(state) },
    {getUserInfo}
)(User)