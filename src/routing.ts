import { Express, Request, Response } from 'express'

import { slugCreation } from './modules/slugCreation'
import { client } from './db/client'

import { payloadInterface } from './modules/interfaces/payload'

export const Route = async (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    res.send('a')
  })

  app.post('/api/links/search', async (req: Request, res: Response) => {
    const body = req.body
    let returnPayload: payloadInterface

    if (body.slug != undefined) {
      const search = await client.link_container.findMany({
        where: {
          slug: body.slug,
        },
      })

      if (search.length > 0) {
        returnPayload = {
          status: 1,
          message: 'Slug Found!!',
          payload: search[0],
        }
      } else {
        returnPayload = {
          status: 0,
          message: 'Slug not exist',
        }
      }
    } else {
      returnPayload = {
        status: 0,
        message: 'blank body',
      }
    }

    res.json(returnPayload)
  })

  app.post('/api/links/create', async (req: Request, res: Response) => {
    const body = req.body

    let returnPayload: payloadInterface

    if (body.link !== undefined) {
      const search = await client.link_container.findMany({
        where: {
          real_link: body.link,
        },
      })

      if (search.length > 0) {
        returnPayload = {
          status: 1,
          message: 'Link exist..',
          payload: search[0],
        }
      } else {
        const slug = await slugCreation()

        try {
          const create = await client.link_container.create({
            data: {
              slug: slug,
              real_link: body.link,
            },
          })

          console.log(create)
          returnPayload = {
            status: 1,
            message: 'Link created success',
            payload: create,
          }
        } catch (e) {
          console.error(e)
          returnPayload = {
            status: 1,
            message: `Something error occurred: ${e}`,
            payload: search[0],
          }
        }
      }
    } else {
      returnPayload = {
        status: 0,
        message: 'blank body',
      }
    }

    res.json(returnPayload)
  })
}
