// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

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
