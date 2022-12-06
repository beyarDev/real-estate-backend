import {Pool} from 'pg'

const ENV:string = process.env.NODE_ENV || "development"

import dotenv from 'dotenv'

dotenv.config({
    path:`${__dirname}/../../.env.${ENV}`
})

const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {};
    

export default new Pool(config)