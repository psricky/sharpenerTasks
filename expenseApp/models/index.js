const NewUsers = require('../models/user');
const Expense = require('../models/expense');

NewUsers.hasMany(Expense, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Expense.belongsTo(NewUsers, {
    foreignKey: 'userId'
});

module.exports={
    NewUsers,
    Expense
}