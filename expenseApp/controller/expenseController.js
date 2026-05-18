const { Sequelize } = require('sequelize')
const Expense=require('../models/expense')
const NewUsers=require('../models/user')
const addExpense=async(req,res)=>{
    try {
        const {amount,description,category}=req.body
        if(!amount || !description || !category){
            return res.status(400).json({
                success:false,
                message:"Fields are mandatory"
            })
        }
        const userId=req.user.id
        const newExpense=await Expense.create({
            amount:amount,description:description,category:category,userId:userId
        })
        // Update the user's total expenses
        const user=await NewUsers.findByPk(userId)
        await user.update({totalExpenses: user.totalExpenses + parseFloat(amount)})
        return res.status(201).json({
            success:true,
            message:"Expense added successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const getExpenses=async(req,res)=>{
    try {
        const userId=req.user.id
        const expenses=await Expense.findAll({where:{userId:userId}})
        return res.status(200).json({
            success:true,
            data:expenses
        })
        if (!expenses) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
const deleteExpense=async(req,res)=>{
    try {
        const expenseId=req.params.id
        const userId=req.user.id
        const expense=await Expense.findOne({where:{id:expenseId,userId:userId}})
        if(!expense){
            return res.status(404).json({
                success:false,
                message:"Expense not found"
            })
        }
        await expense.destroy()
        return res.status(200).json({
            success:true,
            message:"Expense deleted successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


module.exports={
    addExpense,
    getExpenses,
    deleteExpense,

}