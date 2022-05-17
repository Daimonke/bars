import 'dotenv/config'
import mysql from 'mysql2/promise'

export default async function connect(){
        const connection = await mysql.createConnection({
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.DBPORT,
        database: process.env.DATABASE
    })
    console.log(`Connected DB: ${connection.config.database}`)
    return connection
}
