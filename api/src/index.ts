import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { config } from './config'
import { Todo } from './entities/Todo'

createConnection(config as any)
  .then(async connection => {
    const PORT = process.env.PORT || 8088
    const app = express()

    app.set('env', process.env.APP_ENV)

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })

    app.get('/', function(req, res) {
      res.send('hello yo yo')
    })

    let todo = new Todo()
    todo.description = 'Clean room'
    todo.isDone = true

    return connection.manager.save(todo).then(todo => {
      console.log('Todo has been saved. Todo id is', todo.id)
    })
  })
  .catch(error => console.log(error))
