const {Sequelize} = require('sequelize');
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new Sequelize('testdb', 'root', dbPassword, {
    host: 'localhost',
    dialect: 'mysql'
});
(async () => {
    try {
        await sequelize.authenticate(); 
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;