import axios from 'axios'

//action type
const GET_LIST = 'INDEX/GET_LIST'

//action createtor 
const getList = (list)=>({
    type:GET_LIST,
    list
})

export const getIndexList = (server)=>{
    console.log('in=============getIndex')
    return (dispatch, getState, axiosInstance) =>{
    console.log('in=============getIndex ---in')
        return axios.get('http://localhost:8082/api/course/list').then(res=>{
            const {list} =  res.data
            console.log(list)
            dispatch(getList(list))           
        })
    }
}

const defaultStatus = {list:[]}
export default (state = defaultStatus, action)=>{
    switch(action.type){
        case GET_LIST:
            console.log('getState')
            const newState = {
                ...state,
                list:action.list
            }
            return newState
        default:
            return state
    }
}