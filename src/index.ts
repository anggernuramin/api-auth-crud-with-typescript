import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes'
import { logger } from './utils/logger'
import { deserializeToken } from './middlewares/deserializeToken'

const app: Application = express()
const port: number = 3000

// middleware
// parse body request menjadi json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect db
import './utils/connectDB'

// cors akses handler
app.use(cors())
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Accesss-Control-Allow-Headers', '*')
  next()
})

// middleware untuk access token dan otorisasi saat user menhit endpoint
app.use(deserializeToken)

// Kumpulan endpoint
routes(app)

app.listen(port, () => {
  logger.info(`Server is listening on port${port}`)
})
