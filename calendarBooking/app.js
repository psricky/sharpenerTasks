const express=require('express');
const app=express();
const db=require('./config/db');
require('./models/Booking');
app.use(express.json());
const slotRoute=require('./routes/slotRoute');
const bookingRoute=require('./routes/bookingRoute');
app.use('/',slotRoute);
app.use('/',bookingRoute);

app.use(express.urlencoded({extended:true}))
app.use(express.static('public', {index: 'index.html'}));

db.sync({force: false}).then(()=>{
    app.listen(3000, () => {
        console.log('Server connected to port')
    });
}).catch((err)=>{
    console.log(err);
});

