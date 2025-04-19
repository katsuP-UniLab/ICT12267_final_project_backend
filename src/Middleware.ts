import { Express } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export const Middleware = (app: Express) => {
  app.use(cors(corsOptions))
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
}
