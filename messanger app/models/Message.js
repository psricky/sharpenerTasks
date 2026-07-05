const Sequelize = require("sequelize");

const sequelize = require("../config/db");

const Message = sequelize.define("Message", {

    id: {

        type: Sequelize.INTEGER,

        autoIncrement: true,

        primaryKey: true,

        allowNull: false

    },

    message: {

        type: Sequelize.TEXT,

        allowNull: false

    }

});

module.exports = Message;