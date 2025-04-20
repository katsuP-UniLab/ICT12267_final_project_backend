import { client } from '../db/client'

const slugLog =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

const randomize = (length: number) => {
  let tempSlug = ''

  for (let i = 0; i < length; i++) {
    var charID = Math.floor(Math.random() * slugLog.length)
    var char = slugLog[charID]

    tempSlug += char
  }

  return tempSlug
}

export const slugCreation = async () => {
  let rtnSlug = ''
  let exit: number = 10

  do {
    rtnSlug = randomize(5)

    // Query Check
    let query = await client.link_container.findMany({
      where: {
        slug: rtnSlug,
      },
    })

    if (query.length == 0) {
      exit = 0
      break
    } else {
      // Give 10 tries
      exit = exit - 1
    }
  } while (exit > 0)

  return rtnSlug
}
