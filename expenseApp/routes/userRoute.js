const express=require('express')
const router=express.Router()
const  userController  = require('../controller/userController')
const authMiddleware= require('../middleware/auth');

router.post('/signup',userController.userEntry)
router.post('/login',userController.userLogin)
router.get('/get-user',authMiddleware.authenticate,userController.getUserDetails)

module.exports=router;