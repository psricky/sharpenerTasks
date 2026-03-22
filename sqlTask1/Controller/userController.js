const db=require('../utils/db')

const addEntries=(req,res)=>{
    const {name, email}=req.body
    const insertQuery='INSERT INTO users (name,email) VALUES (?,?)'

    db.execute(insertQuery,[name,email],(err)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return

        }

        console.log('Value has been inserted')
        res.status(200).send(`Student with name ${name} successfully added`)
    })
}

const updateEntry=(req,res)=>{
    const {id}=req.params
    const {name,email}=req.body
    const updateQuery= `UPDATE users SET name=?, email=? WHERE id=?`

    db.execute(updateQuery,[name,email,id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }
        if(result.affectedRows===0){
            res.status(404).send('User not found')
            return
        }
        res.status(200).send('User has been updated')
    })
}

const deleteEntry=(req,res)=>{
    const {id}=req.params
    const deleteQuery=`DELETE FROM users WHERE id=?`
    db.execute(deleteQuery,[id],(err,result)=>{
        if(err){
            console.log(err.message)
            res.status(500).send(err.message)
            db.end()
            return
        }
        if(result.affectedRows===0){
            res.status(404).send('User not found')
            return
        }
        res.status(200).send(`User with id ${id} is deleted`)
    })
}

module.exports={
    addEntries,
    updateEntry,
    deleteEntry
}