const express=require('express')
const router=express.Router()

const busController=require('../controller/busController')
//router.get('/',userController.getUsers)
router.post('/add',busController.addBus)
router.get('/available/:seats',busController.getBusesGreaterThanSpecifiedSeats)
//router.delete('/delete/:id',userController.deleteUser)

module.exports=router
