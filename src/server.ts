import { app } from './express'
import dotenv from 'dotenv'

dotenv.config()
const port: number = Number(process.env.PORT) || 4343

app.listen(port, () => {
  console.log('🚀 Server ready at: http://localhost:', port)
})
