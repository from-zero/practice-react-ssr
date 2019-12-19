// import axios from 'axios'
// import {host} from '../config/index'

//action type
const GET_LIST = 'USER/GET_USERINFO'
const LOGIN = 'USER/LOGIN'
const LOGOUT = 'USER/LOGOUT'

//action createtor 
const getList = (data)=>({
    type:GET_LIST,
    data 
})

export const getUserInfo = (server)=>{
    console.log('-----in getUserInfo')
    return (dispatch, getState, $axios) =>{
        console.log('-----in getUserInfo inner')
        return $axios.get(`/api/user/info`).then(res=>{
            const {data} =  res.data
            console.log(data)
            dispatch(getList(data))           
        }).catch(e=>{
            console.log(e)
        })
    }
}

const defaultStatus = {isLogin:false, userinfo:{}}
export default (state = defaultStatus, action)=>{
    switch(action.type){
        case GET_LIST:
            return {
                ...state,
                userinfo:action.data
            }
            return newState
        case LOGIN:
            return {
                ...state,
                isLogin:true
            }
        case LOGOUT:
            return {
                ...state,
                isLogin:false
            }
            return newState
        default:
            return state
    }
}