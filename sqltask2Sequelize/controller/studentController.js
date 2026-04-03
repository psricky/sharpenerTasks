const db = require('../utils/db')
const Student = require('../models/students')
const IdentityCard = require('../models/identityCard');
const Department = require('../models/department');

const addEntry = async (req, res) => {
    try {
        const { name, email } = req.body;
        const student = await Student.create({

            name: name,
            email: email
        });

        res.status(201).send(`User with name ${name} is created`)
    } catch (error) {
        console.log(error)
        res.status(500).send('Unable to make an entry')
    }
}

const updateEntry = async (req, res) => {
    try {
        const { id } = req.params
        const { name, email } = req.body
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).send('User not found')
        }
        student.name = name;
        student.email = email;
        await student.save()
        return res.status(200).send('User has been updated')

    } catch (error) {
        return res.status(500).send('Use cannot be updated')
    }
}

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Student.destroy({
            where: { id: id }
        });

        if (!deleted) {
            return res.status(404).send('User not found')
        }
        return res.status(200).send('User deleted')
    } catch (error) {
        console.log(error);
        return res.status(500).send('User cannot be deleted');
    }
}

const createDepartment = async (req, res) => {
    const { departmentname } = req.body;
    const createdDepartment = await Department.create({ name: departmentname });
    return res.status(201).json(createdDepartment);
}

/*
CREATE A STUDENT under a DEPARTMENT
*/

const addStudentUnderADepartment = async (req, res) => {
    try {
        const { name, email, departmentId } = req.body;
        const department = await Department.findByPk(departmentId);
        if (!department) {
            return res.status(404).send('Department not found');
        }
        const student = await Student.create({
            name,
            email,
            departmentId: department.id
        });
        return res.status(201).json(student);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Student cannot be created under the department')
    }
}

/*
CREATE A STUDENT with an IDENTITY CARD
*/

const createStudentWithIdentityCard = async (req, res) => {
    try {
        const { studentId, cardNo } = req.body;
        const student = await Student.findByPk(studentId);
        if (!student) {
            return res.status(404).send('Student not found');
        }

        //prevent duplicate entries
        const existingStudentCard = await IdentityCard.findOne({
            where: { studentId: student.id }
        });
        if (existingStudentCard) {
            return res.status(400).send('Student already has an identity card');
        }
        const existingCard = await IdentityCard.findOne({
            where: { cardNo: cardNo }
        });
        if (existingCard) {
            return res.status(400).send('Identity card already exists');
        }

        const identityCard = await IdentityCard.create({
            cardNo,
            studentId: student.id
        });

        return res.status(201).json({
            student,
            identityCard
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Student with identity card cannot be created')
    }
}

const getStudents = async (req, res) => {
    try {
        const students = await Student.findAll({
                include: [Department, IdentityCard]
        });
        return res.status(200).json(students);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Students cannot be fetched');
    }
}

const getStudentById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const student = await Student.findByPk(id, {
                include: [Department, IdentityCard]
        });
        if (!student) {
            return res.status(404).send('Student not found');
        }
        return res.status(200).json(student);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Student cannot be fetched');
    }
}

module.exports = {
    addEntry,
    updateEntry,
    deleteEntry,
    createDepartment,
    addStudentUnderADepartment,
    createStudentWithIdentityCard,
    getStudents,
    getStudentById
}