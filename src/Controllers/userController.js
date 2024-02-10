const { createUser, findUsers, eraseUser, updateUser } = require('../Services/userService')

const create = async (req, res)=>{
    const { u_name, u_password, u_email } = req.body

    if(!u_name || !u_password || !u_email)
        return res.status(401).send('Bad requestion')

    if(u_name.length < 4 || u_name.length > 20 || u_password.length < 7 || u_password.length > 40)
        return res.status(401).send('Bad requestion')

    const msg = await createUser({u_name, u_password, u_email})
    return res.status(201).send(msg)
}


const erase = async (req, res)=>{
    const { ID } = req.params

    const { message } = await eraseUser( ID )

    res.send(message)
}

const update = async (req, res)=>{
    const { ID } = req.params
    const {u_email, u_password} = req.body

    if(!u_email && !u_password)
        return res.status(401).send('Bad requestion')

    const {message} = await updateUser( ID, req.body )

    res.send(message)
}

module.exports = {
    create,
    erase,
    update
}

