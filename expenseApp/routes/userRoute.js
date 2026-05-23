const express=require('express')
const router=express.Router()
const  userController  = require('../controller/userController')
const aiController = require('../controller/aiController')
const authMiddleware= require('../middleware/auth');

router.post('/signup',userController.userEntry)
router.post('/login',userController.userLogin)
router.get('/get-user',authMiddleware.authenticate,userController.getUserDetails)
router.post('/gemini/ask',authMiddleware.authenticate,aiController.aiResponse)

module.exports=router;