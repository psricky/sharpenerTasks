const express=require('express')
const router=express.Router()
const  expenseController  = require('../controller/expenseController')
const pageController=require('../controller/pageanationController')
const authMiddleware = require('../middleware/auth');
const reportGenerate = require('../controller/reportGenerateController');

router.post('/add-expense', authMiddleware.authenticate, expenseController.addExpense);

router.get('/get-expenses',authMiddleware.authenticate,expenseController.getExpenses)

router.delete('/delete-expense/:id',authMiddleware.authenticate,expenseController.deleteExpense)

router.get('/paginated/',authMiddleware.authenticate, pageController.getPaginatedExpenses);


router.get('/download-csv', authMiddleware.authenticate, reportGenerate.downloadCSV);

module.exports=router;