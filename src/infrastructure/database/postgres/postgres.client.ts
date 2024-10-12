import pgPromise from 'pg-promise'
import dotenv from 'dotenv'

dotenv.config()

const pgp = pgPromise()
const db = pgp({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_BIND_PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
})

export default db

// // db-migrate up --config src/infrastructure/database/postgres/database.json
