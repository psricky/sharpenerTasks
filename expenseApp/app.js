const express=require('express')
const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.static('public', {index: 'index.html'}));
app.use(express.json());
const db=require('./config/db')
const userRoute=require('./routes/userRoute')
app.use('/',userRoute)

db.sync().then(()=>{
    app.listen(3000, () => {
        console.log('Server connected to port')
    });
}).catch((err)=>{
    console.log(err);
});