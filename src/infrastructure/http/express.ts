import type { Express } from 'express'
import express from 'express'
import userRoutes from './routes/routes'

export const app: Express = express()

app.use(express.json())
app.use('/api/users', userRoutes)
