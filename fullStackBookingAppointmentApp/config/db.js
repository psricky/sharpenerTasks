const {Sequelize}=require('sequelize')
const sequelize=new Sequelize('testdb','root','Waheguru@083',{
    host:'localhost',
    dialect:'mysql'
});
(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
})();
module.exports=sequelize;