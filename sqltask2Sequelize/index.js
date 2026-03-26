const express=require('express')
const app=express() 

const db=require('./utils/db')

const studentModel=require('./models/students')

db.sync({force:false}).then(()=>{
    app.listen(3000,(err)=>{
    console.log('Server is running')
})
}).catch((err)=>{
    console.log(err)
})
