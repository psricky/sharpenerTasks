const express=require('express')
const router=express.Router()
const  userController  = require('../controller/userController')

router.post('/signup',userController.userEntry)
router.post('/login',userController.userLogin)

module.exports=router