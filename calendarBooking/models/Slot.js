const {Sequelize,DataTypes} = require('sequelize');
const sequelize=require('../config/db');
const SlotTable=sequelize.define('SlotTable',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,    
        autoIncrement:true
    },
    timeSlot:{  
        type:DataTypes.STRING(255),
        allowNull:false
    },
    slotsAvailable:{
        type:DataTypes.INTEGER,
        allowNull:false 
    },
});
module.exports = SlotTable;