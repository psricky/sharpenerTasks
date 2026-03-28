const express=require('express')
const app=express()

app.use(express.json())
const db=require('./utils/db')
const userModel=require('./models/users')
const busModel=require('./models/buses')
const bookingModel=require('./models/bookings')
const paymentModel=require('./models/payments')

const userRoute=require('./routes/userRoute')
const busRoute=require('./routes/busRoute')
app.use('/users',userRoute)
app.use('/buses',busRoute)


db.sync({force:false}).then(()=>{
    app.listen(3000,()=>{
    console.log('Server connected to port')
})
}).catch((error)=>{
    console.log(error)
})


