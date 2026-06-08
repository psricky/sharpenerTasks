
require('dotenv').config();
const express=require('express')
const app=express()
const db=require('./config_db/db')
//const helmet=require('helmet');
const path=require('path');
   
require('./models')
const fs=require('fs');
const morgan=require('morgan');

const userRoute=require('./routes/userRoute')
const expenseRoute=require('./routes/expenseRoute')
const purchaseRoute=require('./routes/purchaseRoute')
const premiumRoute=require('./routes/premiumRoute')
const errorLogStream = fs.createWriteStream(
  path.join(__dirname, 'error.log'), 
  { flags: 'a' }
);
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))
app.use(morgan('combined', { stream: errorLogStream, skip: (req, res) => res.statusCode < 400 }));
//app.use(helmet());
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