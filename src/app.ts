import express, { json } from 'express'
import 'express-async-errors'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index'
import { errorHandling } from './middlewares/errorHandling'

dotenv.config()

const app = express()

app.use(cors())
app.use(json())

app.use(routes)
app.use(errorHandling)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`server is up on port ${PORT}`))
