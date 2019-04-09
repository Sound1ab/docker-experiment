import { Todo } from '../entities/Todo'
import { configureRepository } from '../helpers'

interface IGetTodo {
  id: number
}

interface ICreateTodo {
  input: {
    description?: string
  }
}

interface IUpdateTodo {
  input: {
    id: number
    description?: string
    isDone?: boolean
  }
}

interface IDeleteTodo {
  input: {
    id: number
  }
}

export async function TodoQueries() {
  return {
    getTodo: await configureRepository<Todo, IGetTodo>(
      Todo,
      (repository, { id }) => {
        return repository.findOne(id)
      }
    ),
    listTodos: await configureRepository<Todo, {}>(Todo, repository => {
      return {
        items: repository.find(),
        nextToken: '1234',
      }
    }),
  }
}

export async function TodoMutations() {
  return {
    createTodo: await configureRepository<Todo, ICreateTodo>(
      Todo,
      async (repository, { input: { description = '' } }) => {
        const todo = new Todo()
        todo.description = description
        todo.isDone = false
        return repository.save(todo)
      }
    ),
    deleteTodo: await configureRepository<Todo, IDeleteTodo>(
      Todo,
      async (repository, { input: { id } }) => {
        const todo = await repository.findOne(id)
        await repository.delete(id)
        return todo
      }
    ),
    updateTodo: await configureRepository<Todo, IUpdateTodo>(
      Todo,
      async (repository, { input: { id, description, isDone } }) => {
        const todo = await repository.findOne(id)
        if (!todo) return null
        todo.description = description || todo.description
        todo.isDone = isDone || todo.isDone
        return repository.save(todo)
      }
    ),
  }
}
