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
NewUsers.hasOne(Order, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
Order.belongsTo(NewUsers, {
    foreignKey: 'userId'
});

module.exports={
    NewUsers,
    Expense,
    Order
}