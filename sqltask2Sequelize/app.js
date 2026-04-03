const express=require('express')
const app=express() 

const db=require('./utils/db')

app.use(express.json());

require('./models/index')

const studentRoute=require('./routes/studentRouter')
app.use('/students',studentRoute)



db.sync({force:false}).then(()=>{
    app.listen(3000,()=>{
    console.log('Server is running')
})
}).catch((err)=>{
    console.log(err)
})
