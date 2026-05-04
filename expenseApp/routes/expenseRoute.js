const express=require('express')
const router=express.Router()
const  expenseController  = require('../controller/expenseController')
const authMiddleware = require('../middleware/auth');

router.post('/add-expense', authMiddleware.authenticate, expenseController.addExpense);


//router.post('/add-expense',expenseController.addExpense)
router.get('/get-expenses',authMiddleware.authenticate,expenseController.getExpenses)
router.delete('/delete-expense/:id',authMiddleware.authenticate,expenseController.deleteExpense)

module.exports=router