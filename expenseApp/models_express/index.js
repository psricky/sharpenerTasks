const NewUsers = require('../models/user');
const Expense = require('../models/expense');
const Order = require('../models/order');
const ForgotPasswordRequests = require('../models/forgetPasswordRequest');

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

NewUsers.hasMany(ForgotPasswordRequests, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

ForgotPasswordRequests.belongsTo(NewUsers,{
    foreignKey:'userId'
});

module.exports={
    NewUsers,
    Expense,
    Order,
    ForgotPasswordRequests
}