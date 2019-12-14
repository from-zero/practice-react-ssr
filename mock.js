const express = require('express')
const app = express()

app.get('/api/course/list',(req,res)=>{
    /*
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT')
    res.setHeader('Content-Type','application/json')
    */

    res.json({
        code:0,
        list:[
            {name:'web小白',id:1},
            {name:'web全栈',id:2},
            {name:'js高级',id:3},
            {name:'java架构',id:4}
        ]
    })
})
app.get('/api/user/info',(req,res)=>{
    /*
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT')
    res.setHeader('Content-Type','application/json')
    */

    res.json({
        code:0,
        data: {title:'web小白',best:'小白'}
    })
})
app.listen(8082,()=>{
    console.log('mock启动成功')
})