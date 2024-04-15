import pkg from 'pg'
import dotenv from 'dotenv'
const { Client } = pkg
dotenv.config({ path: '.env' })
const { NODE_ENV } = process.env
export const client = new Client({
  user: NODE_ENV === 'test' || NODE_ENV === 'development' ? process.env.USER : process.env.PGUSER,
  host: NODE_ENV === 'test' || NODE_ENV === 'development' ? process.env.HOST : process.env.PGHOST,
  database: NODE_ENV === 'test' || NODE_ENV === 'development' ? process.env.DATABASE : process.env.PGDATABASE,
  password: NODE_ENV === 'test' || NODE_ENV === 'development' ? process.env.PASSWORD : process.env.PGPASSWORD,
  port: NODE_ENV === 'test' || NODE_ENV === 'development' ? 5432 : 5432,
  [NODE_ENV === 'production' ? 'ssl' : null]: NODE_ENV === 'production' ? true : null
})

async function Init () {
  client.connect().then(() => {
    console.log('Connected database')
  }
  ).catch(err => console.log(err))
}

Init()
