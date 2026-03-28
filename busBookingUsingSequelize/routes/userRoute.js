const express=require('express')
const router=express.Router()

const userController=require('../controller/userController')
router.get('/',userController.getUsers)
router.post('/add',userController.addEntry)
router.delete('/delete/:id',userController.deleteUser)


module.exports=router
