import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { router } from './routes'
import { authRouter } from './authRoutes'

const app = express()

app.use(bodyParser.json({ limit: '16mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(router)
app.use(authRouter)

export { app }
