
const express=require('express')
const app=express()
const db=require('./config/db')
   
require('./models')
require('dotenv').config();

const userRoute=require('./routes/userRoute')
const expenseRoute=require('./routes/expenseRoute')
const purchaseRoute=require('./routes/purchaseRoute')
const premiumRoute=require('./routes/premiumRoute')



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public', {index: 'index.html'}));

app.use('/user',userRoute)
app.use('/expense',expenseRoute)
app.use('/purchase',purchaseRoute)
app.use('/premium',premiumRoute)
app.use('/password',require('./routes/forgetPassword'))

db.sync({alter:true}).then(()=>{
    app.listen(3000, () => {
        console.log('Server connected to port')
    });
}).catch((err)=>{
    console.log(err);
});