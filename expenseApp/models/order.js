const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config_db/db');
const order = sequelize.define('orders', {
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
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = order;