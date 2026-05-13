const NewUsers = require('../models/user');
const Expense = require('../models/expense');
const Order = require('./order');

NewUsers.hasMany(Expense, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Expense.belongsTo(NewUsers, {
    foreignKey: 'userId'
});
Order.belongsTo(NewUsers, {
    foreignKey: 'userId'
});

module.exports={
    NewUsers,
    Expense,
    Order
}