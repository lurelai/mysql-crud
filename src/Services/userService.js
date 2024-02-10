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

const findUsers = (conditions)=>{
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

const eraseUser = (ID)=>{
    return new Promise((resolve)=>{
        User(`DELETE FROM Users WHERE ID="${ID}"`, ((results, err)=>{
            if ( results.results.affectedRows === 0 )
                return resolve({message: "No one user was deleted!"})

            return resolve({message: `User deleted! ${results.results.affectedRows}`})
        }))
    })
}

const updateUser = (ID, whatUpdate={})=>{
    return new Promise(async (resolve)=>{
        const { message: result } = await findUsers(`ID="${ID}"`)

        if( result === "user not founded")
            return resolve({message: 'invalid operation'})

        // {
        //  u_email: ldsknfklvc,
        //  u_password: fjdsklj,
        // }
        const {u_email, u_password} = whatUpdate
        let query = ""

        if(u_email && u_password)
            halfQuery = `u_email="${u_email}", u_password="${u_password}"`

        if(!u_email)
            halfQuery = `u_password="${u_password}"`
        
        if(!u_password)
            halfQuery = `u_email="${u_email}"`

        console.log(`UPDATE Users SET ${halfQuery} WHERE ID=${ID}`)

        User(`UPDATE Users SET ${halfQuery} WHERE ID="${ID}"`)
        return resolve({message: 'user updated'})
    })
}

module.exports = {
    createUser,
    findUsers,
    eraseUser,
    updateUser
}

