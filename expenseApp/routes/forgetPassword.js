const express=require('express')
const router=express.Router()
const  forgetPasswordController  = require('../controller/passwordController')

router.post('/forget-password', forgetPasswordController.forgetPassword)

module.exports=router;