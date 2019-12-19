import React from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
const LoginPage = (props)=>{
    console.log(props)
    return <div>
        <h1>登录页面</h1>
        <button onClick={()=>{console.log('from click'); props.login()}}>登录</button>
    </div>
}
function Login(props){
    const check=()=>{
        if(props.isLogin){
            console.log('aaaa');
            return <Redirect to='/user'></Redirect>
        }else{
            return(<LoginPage {...props}></LoginPage>)
        }
    }
    return<div>
        {check()}
    </div>
}

export default connect(
    state=>({isLogin:state.user.isLogin}),
    (dispatch)=>{
        return {login:()=>dispatch({type:'USER/LOGIN'})}
    }
)(Login)