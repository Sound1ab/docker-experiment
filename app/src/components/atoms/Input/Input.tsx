import gql from 'graphql-tag'
import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { styled } from '../../../theme'
import { ListTodosDocument } from '../../App'

const CreateTodoDocument = gql`
  mutation CreateTodo($description: String!) {
    createTodo(input: { description: $description }) {
      id
      description
      isDone
      createdAt {
        dateLongForm
        dayOfMonth
        dayOfWeek
        month
      }
      updatedAt {
        dateLongForm
        dayOfMonth
        dayOfWeek
        month
      }
    }
  }
`

const Style = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.xs};

  .input-text {
    border: none;
    background-color: ${({ theme }) => theme.colors.brand};
    padding: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`

export function Input() {
  const [todo, setTodo] = useState('')
  const createTodo = useMutation(CreateTodoDocument, {
    update: (cache, { data: { createTodo } }) => {
      const result = cache.readQuery({
        query: ListTodosDocument,
      }) as any
      const todos = (result && result.listTodos && result.listTodos.items) || []
      cache.writeQuery({
        data: { listTodos: { items: todos.concat([createTodo]) } },
        query: ListTodosDocument,
      })
    },
  })

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setTodo(e.target.value)
  }

  async function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      try {
        await createTodo({ variables: { description: todo } })
        setTodo('')
      } catch (e) {
        console.error(`There was an issue creating todo: ${e.message}`)
      }
    }
  }

  return (
    <Style>
      <input
        type="text"
        placeholder="New Todo"
        className="input-text"
        onChange={handleOnChange}
        value={todo}
        onKeyDown={handleKeyDown}
      />
    </Style>
  )
}
