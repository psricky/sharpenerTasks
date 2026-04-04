const { Sequelize,DataTypes } = require("sequelize")

const sequelize=require('../utils/db') 

const StudentCourse=sequelize.define('studentCourse',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    }
})

module.exports=StudentCourse