const Expense=require('../models/expense')
const addExpense=async(req,res)=>{
    try {
        const {amount,description,category}=req.body
        if(!amount || !description || !category){
            return res.status(400).json({
                success:false,
                message:"Fields are mandatory"
            })
        }
        const newExpense=await Expense.create({amount,description,category})
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
        const expenses=await Expense.findAll()
        return res.status(200).json({
            success:true,
            data:expenses
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
    getExpenses
}