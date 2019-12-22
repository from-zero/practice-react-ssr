import React,{useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {getIndexList} from '../store/index'
import styles from './Index.css'
import WithStyle from '../component/withStyle'
// import withStyles from 'isomorphic-style-loader/withStyles'

function Index(props){
    const [count, setCount] = useState(1)

    useEffect(()=>{
        if(!props.list.length){
            props.getIndexList()
        }
    },[])
    return <div className={styles.cont}>
        <h1 className={styles.title}>welcome to {props.title}! {count}</h1>
        <button onClick={()=>{setCount(count+1)}}>累加</button>
        <hr/>
        <ul>{
            props.list && props.list.map(item=>{
            return <li key={item.id}>{item.name}</li>
            })
            }</ul>
    </div>
}
Index.loadData = (store)=>{
   return store.dispatch(getIndexList())
}
export default connect(
    state=>({list:state.index.list}),
    {getIndexList}
)(WithStyle(Index,styles))