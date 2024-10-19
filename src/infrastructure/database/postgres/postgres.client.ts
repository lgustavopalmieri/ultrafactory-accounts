// ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨
// ⚙️---⚙️---⚙️ Powered by Ultrafactory Software Solutions 2024 ⚙️---⚙️---⚙️
// ____________________________________________________________________
import pgPromise from 'pg-promise'
import dotenv from 'dotenv'

dotenv.config()

const pgp = pgPromise()
export const productionDatabase = pgp({
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_BIND_PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
})

export const testDatabase = pgp({
  host: process.env.POSTGRES_TEST_HOST,
  port: Number(process.env.POSTGRES_TEST_BIND_PORT),
  database: process.env.POSTGRES_TEST_DB,
  user: process.env.POSTGRES_TEST_USER,
  password: process.env.POSTGRES_TEST_PASSWORD
})

// // db-migrate up --config src/infrastructure/database/postgres/database.json
