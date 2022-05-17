import 'dotenv/config'

        export const config: Object = {
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        host: process.env.HOST,
        port: process.env.DBPORT,
        database: process.env.DATABASE
    }
 
