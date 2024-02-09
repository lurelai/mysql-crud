const User = require('../Models/userModel')

const createUser = async ()=>{
    const { message } = await User(`INSERT INTO Users VALUES("name_u", "email", "password")`, ({results, err})=>{
        if(err){
            if(err.code === "ER_DUP_ENTRY")
                return "User alredy exist"
        }

        return "Created"
    })

    return message;
}

module.exports = {
    createUser
}

