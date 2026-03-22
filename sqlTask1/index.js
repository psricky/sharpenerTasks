const express=require('express')
const app=express()
const db=require('./utils/db')
const userRoutes=require('./Routes/userRoutes')

app.use(express.json())

app.use('/users',userRoutes)

app.listen(3000,()=>{
    console.log('Server is running')
})