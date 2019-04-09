import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { config } from './config'
import { ApolloServer, IResolvers } from 'apollo-server-express'
import { convertGraphQLToTypedefs } from './helpers'
import { TodoQueries, TodoMutations } from './resolvers/todo'

const port = process.env.PORT || 8088

async function configureServer() {
  const app = express()

  app.set('env', process.env.APP_ENV)

  const resolvers: IResolvers = {
    Query: {
      ...(await TodoQueries()),
    },
    Mutation: {
      ...(await TodoMutations()),
    },
  }

  const server = new ApolloServer({
    typeDefs: convertGraphQLToTypedefs(),
    resolvers,
  })

  server.applyMiddleware({ app })

  return { server, app }
}

;(async function bootstrapServer() {
  try {
    await createConnection(config as any)
    const { server, app } = await configureServer()

    app.listen({ port }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      )
    )
  } catch (e) {
    console.error(`There was an error bootstraping server: ${e.message}`)
  }
})()
