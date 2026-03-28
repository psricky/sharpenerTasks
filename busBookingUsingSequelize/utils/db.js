const {Sequelize}=require('sequelize')
const sequelize=new Sequelize('testdb','root','Waheguru@083',{
    host:'localhost',
    dialect:'mysql'
});
(async ()=>{
    try {
    await sequelize.authenticate();
    console.log('Connection to database established')
} catch (error) {
    console.log('Unable to connect to database:',error)
}
})();

module.exports=sequelize

    