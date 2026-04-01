const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public', { index: 'index.html' }))
app.use(express.urlencoded({ extended: true }))


const db = require('./config/db')

const userRoute = require('./routes/userRoute')

app.use('/api/users', userRoute)

db.sync({ force: false }).then(() => {

    app.listen(3000, () => {
        console.log('Server connected to port')
    })
}).catch((error) => {
    console.log(error)
})
