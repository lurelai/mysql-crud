const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes
require('./src/Routes/userRoute')(app)

app.get('/', (req, res)=>{
    res.send('A simple crud using mysql-database and mysql package')
})

app.listen(8080, ()=>console.log('Server running'))

