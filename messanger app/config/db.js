const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    "testmessanger",     // Database Name
    "root",          // Username
    "Password@123",      // Password
    {
        host: "localhost",
        dialect: "mysql"
    }
);

module.exports = sequelize;