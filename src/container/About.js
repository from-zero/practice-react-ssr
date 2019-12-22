import React from 'react'
import style from './About.css'
import WithStyle from '../component/withStyle'
function About(){
    return <div className={style.title}>
        About
    </div>
}

export default WithStyle(About,style)