import gql from 'graphql-tag'
import React, { useEffect, useRef } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { styled } from '../../../theme'
import { ListTodosDocument } from '../../App'
import { Heading } from '../../atoms'

const UpdateTodoDocument = gql`
  mutation UpdateTodo($id: ID!, $isDone: Boolean, $description: String) {
    updateTodo(input: { id: $id, isDone: $isDone, description: $description }) {
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
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.text.secondary};
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;

  > * {
    padding: ${({ theme }) => theme.spacing.xs};
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .card-date {
    flex: 0;
    align-items: center;
    border-right: 1px solid ${({ theme }) => theme.colors.text.secondary};
  }

  .card-location {
    flex: 1;
    align-items: flex-start;
  }

  .card-highlight {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  .card-chevron::before {
    border-style: solid;
    border-width: 0.25em 0.25em 0 0;
    content: '';
    display: inline-block;
    height: 0.75em;
    position: relative;
    top: 0.15em;
    vertical-align: top;
    width: 0.75em;
    left: 0;
    transform: rotate(45deg);
    color: ${({ theme }) => theme.colors.brand};
  }
`

interface ICard {
  id: number
  dayOfMonth: number
  dayOfWeek: string
  month: string
  location: string
  isDone: boolean
}

export function Card({
  id,
  dayOfMonth,
  dayOfWeek,
  location,
  month,
  isDone,
}: ICard) {
  const inputEl = useRef<HTMLInputElement>(null)
  const updateTodo = useMutation(UpdateTodoDocument, {
    update: (cache, { data: { updateTodo } }) => {
      const result = cache.readQuery({
        query: ListTodosDocument,
      }) as any
      const todos = (result && result.listTodos && result.listTodos.items) || []
      cache.writeQuery({
        data: {
          listTodos: {
            items: todos
              .filter((todo: any) => todo.id !== id)
              .concat([updateTodo]),
          },
        },
        query: ListTodosDocument,
      })
    },
  })

  async function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.checked)
    await updateTodo({ variables: { id, isDone: e.target.checked } })
  }

  useEffect(() => {
    if (!inputEl || !inputEl.current) {
      return
    }
    inputEl.current.checked = isDone
  }, [])

  return (
    <Style data-testid="Card">
      <div className="card-cell card-date">
        <Heading type="h2">{dayOfMonth}</Heading>
        <Heading type="h6">{month}</Heading>
      </div>
      <div className="card-cell card-location">
        <Heading type="h6">
          <span className="card-highlight">{dayOfWeek}</span>
        </Heading>
        <Heading type="h2">{location}</Heading>
      </div>
      <input type="checkbox" ref={inputEl} onChange={handleOnChange} />
    </Style>
  )
}
