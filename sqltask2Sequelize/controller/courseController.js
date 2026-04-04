const Course =require('../models/courses');
const StudentCourse=require('../models/studentCourses');
const  Student=require('../models/students');

const addCourse=async(req,res)=>{
    try {
        const {name}=req.body;
        const course=await Course.create({"name":name});
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const addStudentToCourse=async(req,res)=>{
    
    try {
        const {courseId,studentId}=req.body;
        const student=await Student.findByPk(studentId);
        const course=await Course.findAll({
            where:{id:courseId
            }
        });
        if(!student || !course){
            return res.status(404).json({message:'Student or Course not found'})
        }

        await student.addCourses(course);

        const updatedStudent=await Student.findByPk(studentId,{
            include:Course
        });
        res.status(201).json(updatedStudent);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


module.exports={
    addCourse,
    addStudentToCourse
}