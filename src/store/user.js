import axios from 'axios'
import {host} from '../config/index'

//action type
const GET_LIST = 'INDEX/GET_USERINFO'

//action createtor 
const getList = (data)=>({
    type:GET_LIST,
    data 
})

export const getUserInfo = (server)=>{
    console.log('-----in getUserInfo')
    return (dispatch, getState, axiosInstance) =>{
        console.log('-----in getUserInfo inner')
        return axios.get(`${host}/api/use/info`).then(res=>{
            const {data} =  res.data
            console.log(data)
            dispatch(getList(data))           
        }).catch(e=>{
            console.log(e)
        })
    }
}

const defaultStatus = {userinfo:{}}
export default (state = defaultStatus, action)=>{
    switch(action.type){
        case GET_LIST:
            const newState = {
                ...state,
                userinfo:action.data
            }
            return newState
        default:
            return state
    }
}