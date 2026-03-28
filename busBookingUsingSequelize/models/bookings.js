const {Sequelize,DataTypes}=require('sequelize')

const sequelize=require('../utils/db')

const Booking =sequelize.define('Booking',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    seatNumber:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

})

module.exports=Booking