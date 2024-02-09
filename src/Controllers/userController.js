const { createUser } = require('../Services/userService')

const create = (req, res)=>{
    createUser("SELECT *")
    res.send('userController')
}

module.exports = {
    create
}

