const express=require('express')
const app=express()
const db=require('./config/db')
const userRoute=require('./routes/userRoute')
const expenseRoute=require('./routes/expenseRoute')

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/user',userRoute)
app.use('/expense',expenseRoute)
app.use(express.static('public', {index: 'index.html'}));

db.sync().then(()=>{
    app.listen(3000, () => {
        console.log('Server connected to port')
    });
}).catch((err)=>{
    console.log(err);
});