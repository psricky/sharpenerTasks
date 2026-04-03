const express=require('express')
const router=express.Router()

const studentController=require('../controller/studentController')

router.post('/add',studentController.addEntry)
router.put('/update/:id',studentController.updateEntry)
router.delete('/delete/:id', studentController.deleteEntry);
router.get('/', studentController.getStudents);
router.get('/:id', studentController.getStudentById);
//router.post('/addingStudentWithIdentityCardAndDepartment', studentController.addValuesToStudentIdentityCardAndDepartment); 

router.post('/departments', studentController.createDepartment);
router.post('/under-department', studentController.addStudentUnderADepartment);
router.post('/with-identity-card', studentController.createStudentWithIdentityCard);
module.exports=router