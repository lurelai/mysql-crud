const pool = require('../Database/db.js')

const User = (query, callBack)=>{
    let hasUser = false

    // verify if there's a table named Users
    pool.query('SHOW TABLES', (err, results)=>{
        for(let tables of results){
            if(tables[`Tables_in_${process.env.MYSQL_DB}`] === 'Users'){
                hasUser = true
                break;
            }
        }

        // Create a the Users if don't have one
        if(!hasUser){
            pool.query(`CREATE TABLE Users(
            u_name varchar(100),
            u_email varchar(100),
            u_password varchar(100),
            UNIQUE(u_name)
            )`)
        }

        pool.query(query, (err, results)=>{
            callBack({err, results})
        })
    })
}

module.exports = User;

