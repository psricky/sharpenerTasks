const {Sequelize,DataTypes} = require('sequelize');
const sequelize=require('../config/db');

const NewUsers=sequelize.define('NewUsers',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,    
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false 
    },
    password:{
        type:DataTypes.STRING(255),
        allowNull:false 
    },
    totalExpenses:{
        type:DataTypes.FLOAT,
        defaultValue:0
    }
    
});


module.exports = NewUsers;