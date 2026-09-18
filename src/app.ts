import cors from 'cors'
import express from 'express'
import { errorHandler } from './middlewares/error-handler.js'
import { userRouter } from './routes/user.routes.js'

export const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (_request, response) => {
  response.json({
    success: true,
    message: 'API is healthy',
  })
})

app.use('/api/users', userRouter)
app.use(errorHandler)
