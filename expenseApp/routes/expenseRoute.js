const express=require('express')
const router=express.Router()
const  expenseController  = require('../controller/expenseController')

router.post('/add-expense',expenseController.addExpense)
router.get('/get-expenses',expenseController.getExpenses)

module.exports=router