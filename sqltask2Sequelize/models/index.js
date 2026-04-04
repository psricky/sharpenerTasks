const Student=require('./students');
const Department=require('./department');
const IdentityCard=require('./identityCard');
const StudentCourses=require('./studentCourses');
const Courses=require('./courses');


Department.hasMany(Student,{
    foreignKey:'departmentId'
});
Student.belongsTo(Department,{
    foreignKey:'departmentId'
});

Student.hasOne(IdentityCard,{
    foreignKey:'studentId'
});
IdentityCard.belongsTo(Student,{
    foreignKey:'studentId'
});

Student.belongsToMany(Courses,{
    through:StudentCourses
});
Courses.belongsToMany(Student,{
    through:StudentCourses
});
module.exports={
    Student,
    Department,
    IdentityCard,
    Courses,
    StudentCourses
}