const { Sequelize } = require('sequelize')
const Expense = require('../models/expense')
const NewUsers = require('../models/user')
const { GoogleGenAI } = require('@google/genai');
const sequelize=require('../config_db/db')
const addExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        
        const { amount, description, expenseCreationDate, note } = req.body
        if (!amount || !description || !note) {
            return res.status(400).json({
                success: false,
                message: "Fields are mandatory"
            })
        }

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })

        const responseFromAi = await ai.models.generateContent({
            model: 'gemini-3.5-flash',
            contents: `Categorize the description "${description}" from the below list:
            Food,Petrol,Salary,Shopping,Travel,Other and give the response in a single word.`
        });

        const userId = req.user.id
        const newExpense = await Expense.create({
            amount: amount, description: description, userId: userId, expenseCreationDate: expenseCreationDate,
             category: responseFromAi.text, note:note
        }, { transaction: t })
        // Update the user's total expenses
        const user = await NewUsers.findByPk(userId)
        await user.update({ totalExpenses: user.totalExpenses + parseFloat(amount) }, { transaction: t })
        await t.commit()
        return res.status(201).json({
            success: true,
            message: "Expense added successfully"
        })
    } catch (error) {
        await t.rollback()
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const getExpenses = async (req, res) => {
    try {
        const userId = req.user.id
        const expenses = await Expense.findAll({ where: { userId: userId } })
        return res.status(200).json({
            success: true,
            data: expenses
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
            success: false,
            message: "Internal server error"
        })
    }
}
const deleteExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        
        const expenseId = req.params.id
        const userId = req.user.id
        const expense = await Expense.findOne({ where: { id: expenseId, userId: userId }, transaction: t })
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }
        await expense.destroy()
        const user = await NewUsers.findByPk(userId)
        await user.update({ totalExpenses: user.totalExpenses - parseFloat(expense.amount) }, { transaction: t })
        await t.commit()
        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        })
    } catch (error) {
        await t.rollback()
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


module.exports = {
    addExpense,
    getExpenses,
    deleteExpense,

}