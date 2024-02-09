const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
require('./src/Routes/createRoute')(app)

app.get('/', (req, res)=>{
    res.send('It is a simple crud with mysql database and using the mysql package')
})

app.listen(8080)

