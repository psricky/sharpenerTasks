const {Sequelize,DataTypes}=require('sequelize');

const sequelize = require('../config_db/db');

const ForgotPasswordRequests = sequelize.define('forgotpasswordrequests', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

module.exports = ForgotPasswordRequests;