import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import indexReducer from './index'
import userReducer from './user'

const reducer = combineReducers({
    index:indexReducer,
    user:userReducer
})

export const getClientStore = ()=>{
    console.log('in clinent store'+new Date().getTime())
    //index:{list:[{name:'test',id:1}]}
    const defaultState = (window && window.__context)?window.__context : {}
    return createStore(reducer, defaultState, applyMiddleware(thunk))
} 
export const getServerStore = () =>{
    console.log('in server store'+new Date().getTime())
    return createStore(reducer, applyMiddleware(thunk))
} 