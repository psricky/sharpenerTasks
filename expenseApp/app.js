const express=require('express')
const db=require('./config/db')
require('./models')
const userRoute=require('./routes/userRoute')
const expenseRoute=require('./routes/expenseRoute')
const app=express()

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public', {index: 'index.html'}));

app.use('/user',userRoute)
app.use('/expense',expenseRoute)


db.sync().then(()=>{
    app.listen(3000, () => {
        console.log('Server connected to port')
    });
}).catch((err)=>{
    console.log(err);
});