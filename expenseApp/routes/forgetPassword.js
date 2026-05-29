const express=require('express')
const router=express.Router()
const  forgetPasswordController  = require('../controller/passwordController')

router.post('/forget-password', forgetPasswordController.forgetPassword)
router.get('/resetpassword/:token', forgetPasswordController.forgetPasswordLinkByUuid)
router.post('/updatepassword/:token', forgetPasswordController.submitNewPassword)
module.exports=router;