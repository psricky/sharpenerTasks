const {Sequelize,DataTypes} = require('sequelize');
const sequelize=require('../config_db/db');
const Payment = sequelize.define('payments', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },

  paymentStatus: {
    type: DataTypes.STRING,
    allowNull: false
  },

  orderAmount: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  orderCurrency: {
    type: DataTypes.STRING,
    allowNull: false
  },

  paymentSessionId: {
    type: DataTypes.STRING,
  }
});

module.exports = Payment;