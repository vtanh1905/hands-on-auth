import * as dotenv from 'dotenv'
import express, { Express } from 'express'
import * as swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import * as YAML from 'yaml'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

import { errorHandlerMiddleware } from './middlewares'
import { Routers } from './controllers/routers'

// Read Environment variable from .env file
dotenv.config({ path: `${__dirname}/../../.env` })

function bootstrap() {
  const app: Express = express()
  const port = process.env.PORT

  //  Config CORS
  app.use(bodyParser.json())
  app.use(
    cors({
      origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN
    })
  )

  // Setup Swagger
  const swaggerDocument = YAML.parse(fs.readFileSync(`${__dirname}/../swagger/openapi.yaml`, 'utf8'))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  // Import API Router
  app.use('/api', Routers.initialize())

  // Host React Application
  app.use(express.static(path.resolve(__dirname, '../../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
  })

  // Error Handler
  app.use(errorHandlerMiddleware)

  const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  })

  return server;
}

bootstrap();