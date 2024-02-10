const User = require('../Models/userModel')
const crypto = require('crypto')

const createUser = ({u_name, u_email, u_password})=>{
    return new Promise((resolve)=>{
        const ID = crypto.randomUUID()

        User(`INSERT INTO Users VALUES("${ID}", "${u_name}", "${u_email}", "${u_password}")`, ({results, err})=>{
            if(err){
                if(err.code === "ER_DUP_ENTRY")
                    return resolve("User alredy exist")
            }

            return resolve("User created")
        })
    })
}

const findUsers = (conditions, callBack=()=>{})=>{
    return new Promise((resolve)=>{
        // Verify if "conditions" is an array with multiples instructions
        if(Array.isArray(conditions)){
            let [conditionsH, operator] = conditions
            let isFirst = false

            // Transfroms the conditions getted by the "conditions" params and tranform in a readable SQL
            conditionsH = conditionsH.map(e=>{
                if(!isFirst){
                    isFirst = true
                    return `WHERE ${e}`
                }

                return e
            }).join(` ${operator} `) 

            conditions = conditionsH; // set conditions as the new readable SQL
        }

        // Verify if "conditions" is null, if is, return all users 
        else if (conditions === null)
            conditions = ""

        // if conditions === string, just give a normal query
        else
            conditions = `WHERE ${conditions}`

        // use all about it and use the conditions to complete the query
        User(`SELECT ID, u_name FROM Users ${conditions}`, ({results})=>{             
            if(results.length === 0)
                return resolve({message: 'user not founded'})

            return resolve({message: 'user founded', users: results})
        })
    })
}

module.exports = {
    createUser,
    findUsers
}

