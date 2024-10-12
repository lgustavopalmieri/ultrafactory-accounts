module.exports = {
  dev: {
    driver: 'pg',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_BIND_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  }
}
