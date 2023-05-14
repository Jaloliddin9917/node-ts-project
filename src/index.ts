import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import config from './config'
import routes from './routes'

const PORT = config.port || 3000

const app: Application = express()
app.use(express.json())
app.use(morgan('common'))
app.use(helmet())
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'el3b b3ed ya ro7 mama',
  })
)
// Routes
app.use('/api', routes)

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍',
  })
})


app.use((_: Request, res: Response) => {
  res.status(404).json({
    message:
      'Ohh you are lost, read the API documentation to find your way back home 😂',
  })
})

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})
export default app
