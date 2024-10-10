import type { Express } from 'express'
import express from 'express'

export const app: Express = express()

app.use(express.json())
