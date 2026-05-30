const sequelize=require('../config/db');
const {Sequelize,DataTypes}=require('sequelize');

const Expense=sequelize.define('Expense',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,    
        autoIncrement:true
    },
    expenseCreationDate:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    category:{
        type:DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Expense;