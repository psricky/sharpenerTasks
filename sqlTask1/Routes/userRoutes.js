const express=require('express')
const router=express.Router()

const userController=require('../Controller/userController')

router.post('/add',userController.addEntries)
router.put('/update/:id',userController.updateEntry)
router.delete('/delete/:id',userController.deleteEntry)

module.exports=router