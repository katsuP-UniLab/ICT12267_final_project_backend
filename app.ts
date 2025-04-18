import express from 'express'
import * as dot from 'dotenv'
import ezServe from 'ez-serve'

dot.config()

const app = express()
const PORT = Number(process.env.PORT) || 3000

ezServe(app, PORT)
