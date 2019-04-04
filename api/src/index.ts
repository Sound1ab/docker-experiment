import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm/browser'

createConnection().then(async connection => {
  const PORT = process.env.PORT || 8088
  const app = express()

  app.set('env', process.env.APP_ENV)

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
})
