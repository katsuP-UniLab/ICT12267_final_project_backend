export interface payloadInterface {
  status: number
  message: string
  payload?: innerPayloadInterface | innerPayloadInterface[]
}

interface innerPayloadInterface {
  id: number
  slug: string
  real_link: string
  create_time: Date
}
