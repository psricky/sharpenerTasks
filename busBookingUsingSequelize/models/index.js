

const Users=require('./users');
const Bookings=require('./bookings');
const Buses=require('./buses');


Users.hasMany(Bookings,{foreignKey:'userId'});
Bookings.belongsTo(Users,{foreignKey:'userId'});

Buses.hasMany(Bookings,{foreignKey:'busId'});
Bookings.belongsTo(Buses,{foreignKey:'busId'});


module.exports={
    Users,
    Bookings,
    Buses
}