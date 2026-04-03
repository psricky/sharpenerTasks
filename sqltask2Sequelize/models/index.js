const Student=require('./students');
const Department=require('./department');
const IdentityCard=require('./identityCard');


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

module.exports={
    Student,
    Department,
    IdentityCard
}