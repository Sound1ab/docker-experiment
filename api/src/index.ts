import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { config } from './config'

createConnection(config as any)
  .then(async connection => {
    const PORT = process.env.PORT || 8088
    const app = express()

    app.set('env', process.env.APP_ENV)

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })

    app.get('/', function(req, res) {
      res.send('hello world')
    })
  })
  .catch(error => console.log(error))
