const express=require('express')
const { userEntry } = require('../controller/userController')
const router=express.Router()

router.post('/user/signup',userEntry)

module.exports=router