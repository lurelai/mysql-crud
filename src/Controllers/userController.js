const { createUser } = require('../Services/userService')

const create = async (req, res)=>{
    const { u_name, u_password, u_email } = req.body

    if(!u_name || !u_password || !u_email)
        return res.status(401).send('Bad requestion')

    if(u_name.length < 4 || u_name.length > 20 || u_password.length < 7 || u_password.length > 40)
        return res.status(401).send('Bad requestion')

    const msg = await createUser({u_name, u_password, u_email})
    return res.status(201).send(msg)
}

module.exports = {
    create
}

