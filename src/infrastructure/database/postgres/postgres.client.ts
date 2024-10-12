import pgPromise from 'pg-promise'
import dotenv from 'dotenv'

dotenv.config()

const pgp = pgPromise()
const db = pgp({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
})

export default db

// // db-migrate up --config src/infrastructure/database/postgres/database.json
