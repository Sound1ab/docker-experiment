import 'reflect-metadata'
import { createConnection, getConnection, Repository } from 'typeorm'
import express from 'express'
import { config } from './config'
import { ApolloServer, IResolvers } from 'apollo-server-express'
import fs from 'fs'
import { Todo } from './entities/Todo'

interface IGetTodo {
  id: number
}

interface ICreateTodo {
  input: {
    description?: string
  }
}

async function configureRepository<T>(
  fn: (repository: Repository<Todo>, args: T) => any
) {
  try {
    const repository = await getConnection().getRepository(Todo)
    return (_: any, args: T) => {
      return fn(repository, args)
    }
  } catch (e) {
    console.log(e.message)
  }
}

createConnection(config as any)
  .then(async () => {
    const port = process.env.PORT || 8088
    const app = express()

    app.set('env', process.env.APP_ENV)

    const typeDefs = fs
      .readFileSync(`${__dirname}/schema/index.graphql`, 'utf8')
      .toString()

    // Provide resolver functions for your schema fields
    const resolvers: IResolvers = {
      Query: {
        getTodo: await configureRepository<IGetTodo>((repository, { id }) => {
          return repository.findOne(id)
        }),
        listTodos: await configureRepository<{}>(repository => {
          return repository.find()
        }),
      },
      Mutation: {
        createTodo: await configureRepository<ICreateTodo>(
          async (repository, { input: { description = '' } }) => {
            console.log('description', description)
            const todo = new Todo()
            todo.description = description
            todo.isDone = false
            return repository.save(todo)
          }
        ),
      },
    }

    const server = new ApolloServer({ typeDefs, resolvers })

    server.applyMiddleware({ app })

    app.listen({ port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    )
  })
  .catch(error => console.log(error))
