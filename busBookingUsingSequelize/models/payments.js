const {Sequelize,DataTypes}=require('sequelize')

const sequelize=require('../utils/db');

const Payment =sequelize.define('Payment',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    amountPaid:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    paymentStatus:{
        type:DataTypes.STRING,
        allowNull:false
    }

})

module.exports=Payment