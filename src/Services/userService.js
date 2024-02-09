const User = require('../Models/userModel')

const createUser = ({u_name, u_email, u_password})=>{
    return new Promise((resolve)=>{
        User(`INSERT INTO Users VALUES("${u_name}", "${u_email}", "${u_password}")`, ({results, err})=>{
            if(err){
                if(err.code === "ER_DUP_ENTRY")
                    return resolve("User alredy exist")
            }

            return resolve("User created")
        })
    })
}

module.exports = {
    createUser
}

