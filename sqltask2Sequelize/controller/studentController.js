const db=require('../utils/db')
const Student=require('../models/students')

const addEntry= async (req,res)=>{
    try {
        const {name,email}=req.body;
        const student=await Student.create({
            
            name:name,
            email:email
        });

        res.status(201).send(`User with name ${name} is created`)
    }catch(error){
        console.log(error)
        res.status(500).send('Unable to make an entry')
    }
}

const updateEntry= async (req,res)=>{
    try {
        const {id}=req.params
        const {name,email}=req.body
        const student=await Student.findByPk(id);
       
        if(!student){
            return res.status(404).send('User not found')
        }
        student.name=name;
        student.email=email;
        await student.save()
        return res.status(200).send('User has been updated')
    
    } catch (error) {
       return res.status(500).send('Use cannot be updated')
    }
}

const deleteEntry = async(req, res) => {
     try{
        const {id} = req.params;
        const deleted  = await Student.destroy({
            where: {id: id}
        });

        if(!deleted){
            return res.status(404).send('User not found')
        }
        return res.status(200).send('User deleted')
     }catch(error){
        console.log(error);
        return res.status(500).send('User cannot be deleted');
     }
}

const getAll = async(req, res)=> {
    try {

        const students = await Student.findAll();
        if(students.length === 0){
            return res.status(404).send('No students fetched');
        }
        return res.json(students)
    }catch(error){
        console.log(error);
        return res.status(500).send('Users cannot be fetched');
    }
}

const getById = async(req, res)=> {
    try {
        const {id} = req.params;
        const student = await Student.findByPk(id);
        if(!student){
            return res.status(404).send('Student not found');
        }
        return res.status(200).json(student);
    }catch(error){
        console.log(error);
        return res.status(500).send('Users cannot be fetched');
    }
}

module.exports={
    addEntry,
    updateEntry,
    deleteEntry,
    getAll,
    getById
}