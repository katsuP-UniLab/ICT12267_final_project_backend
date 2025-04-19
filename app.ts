import express from 'express'
import * as dot from 'dotenv'
import ezServe from 'ez-serve'
import { Route } from './src/Routing'
import { Middleware } from './src/Middleware'

dot.config()

const app = express()
const PORT = Number(process.env.PORT) || 3000

Middleware(app)
Route(app)

ezServe(app, PORT)
