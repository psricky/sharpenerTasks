const { Sequelize,DataTypes } = require("sequelize")

const sequelize=require('../utils/db') 

const IdentityCard=sequelize.define('identityCard',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    cardNo:{
        type:DataTypes.INTEGER,
        unique:true,
        allowNull:false
    }
})

module.exports=IdentityCard