import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import lessonsRouter from './routes/lessons.js'

dotenv.config()
const app = express()

// Middlewares
app.use(bodyParser.json())

// Routers
app.use('/lessons', lessonsRouter)

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}`))
