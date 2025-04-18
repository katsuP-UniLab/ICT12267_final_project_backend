import { Express, Request, Response } from 'express'

export const Route = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('a')
  })
}
