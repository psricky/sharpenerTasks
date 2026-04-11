const {Sequelize,DataTypes} = require('sequelize');
const sequelize=require('../config/db');
const Slot=require('./Slot');

const Meeting=sequelize.define('Meeting',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,    
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false 
    },
    link:{
        type:DataTypes.STRING(255),
        allowNull:false 
    },
    
});
Slot.hasMany(Meeting,{foreignKey:'slotId'});
Meeting.belongsTo(Slot,{foreignKey:'slotId'});

module.exports = Meeting;