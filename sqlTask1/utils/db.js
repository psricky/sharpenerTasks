const mysql=require('mysql2')

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Waheguru@083',
    database:'testdb'
})

connection.connect((err)=>{
    if(err){
        console.log(err)
        return
    }
    console.log('Database connected')

    const createUsers=`CREATE TABLE IF NOT EXISTS Users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL
    )`

    connection.execute(createUsers,(err)=>{
        if(err){
            console.log(err)
            connection.end()
            return
        }
        console.log('Table created')
    })
})

module.exports=connection