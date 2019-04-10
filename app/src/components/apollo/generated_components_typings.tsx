/* tslint:disable */

type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type CreateTodoInput = {
  description?: Maybe<Scalars['String']>
}

export type Date = {
  dayOfWeek: Scalars['String']
  dayOfMonth: Scalars['Int']
  month: Scalars['String']
  dateLongForm: Scalars['String']
}

export type DeleteTodoInput = {
  id?: Maybe<Scalars['ID']>
}

export type ModelBooleanFilterInput = {
  ne?: Maybe<Scalars['Boolean']>
  eq?: Maybe<Scalars['Boolean']>
}

export type ModelFloatFilterInput = {
  ne?: Maybe<Scalars['Float']>
  eq?: Maybe<Scalars['Float']>
  le?: Maybe<Scalars['Float']>
  lt?: Maybe<Scalars['Float']>
  ge?: Maybe<Scalars['Float']>
  gt?: Maybe<Scalars['Float']>
  contains?: Maybe<Scalars['Float']>
  notContains?: Maybe<Scalars['Float']>
  between?: Maybe<Array<Maybe<Scalars['Float']>>>
}

export type ModelIdFilterInput = {
  ne?: Maybe<Scalars['ID']>
  eq?: Maybe<Scalars['ID']>
  le?: Maybe<Scalars['ID']>
  lt?: Maybe<Scalars['ID']>
  ge?: Maybe<Scalars['ID']>
  gt?: Maybe<Scalars['ID']>
  contains?: Maybe<Scalars['ID']>
  notContains?: Maybe<Scalars['ID']>
  between?: Maybe<Array<Maybe<Scalars['ID']>>>
  beginsWith?: Maybe<Scalars['ID']>
}

export type ModelIntFilterInput = {
  ne?: Maybe<Scalars['Int']>
  eq?: Maybe<Scalars['Int']>
  le?: Maybe<Scalars['Int']>
  lt?: Maybe<Scalars['Int']>
  ge?: Maybe<Scalars['Int']>
  gt?: Maybe<Scalars['Int']>
  contains?: Maybe<Scalars['Int']>
  notContains?: Maybe<Scalars['Int']>
  between?: Maybe<Array<Maybe<Scalars['Int']>>>
}

export enum ModelSortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type ModelStringFilterInput = {
  ne?: Maybe<Scalars['String']>
  eq?: Maybe<Scalars['String']>
  le?: Maybe<Scalars['String']>
  lt?: Maybe<Scalars['String']>
  ge?: Maybe<Scalars['String']>
  gt?: Maybe<Scalars['String']>
  contains?: Maybe<Scalars['String']>
  notContains?: Maybe<Scalars['String']>
  between?: Maybe<Array<Maybe<Scalars['String']>>>
  beginsWith?: Maybe<Scalars['String']>
}

export type ModelTodoConnection = {
  items?: Maybe<Array<Maybe<Todo>>>
  nextToken?: Maybe<Scalars['String']>
}

export type ModelTodoFilterInput = {
  id?: Maybe<ModelIdFilterInput>
  description?: Maybe<ModelStringFilterInput>
  and?: Maybe<Array<Maybe<ModelTodoFilterInput>>>
  or?: Maybe<Array<Maybe<ModelTodoFilterInput>>>
  not?: Maybe<ModelTodoFilterInput>
}

export type Mutation = {
  createTodo?: Maybe<Todo>
  updateTodo?: Maybe<Todo>
  deleteTodo?: Maybe<Todo>
}

export type MutationCreateTodoArgs = {
  input: CreateTodoInput
}

export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput
}

export type MutationDeleteTodoArgs = {
  input: DeleteTodoInput
}

export type Query = {
  readTodo?: Maybe<Todo>
  listTodos?: Maybe<ModelTodoConnection>
}

export type QueryReadTodoArgs = {
  id: Scalars['ID']
}

export type QueryListTodosArgs = {
  filter?: Maybe<ModelTodoFilterInput>
  limit?: Maybe<Scalars['Int']>
  nextToken?: Maybe<Scalars['String']>
}

export type Todo = {
  id: Scalars['ID']
  description: Scalars['String']
  isDone: Scalars['Boolean']
  createdAt: Date
  updatedAt: Date
}

export type UpdateTodoInput = {
  id: Scalars['ID']
  description?: Maybe<Scalars['String']>
  isDone?: Maybe<Scalars['Boolean']>
}
export type ListTodosQueryVariables = {}

export type ListTodosQuery = { __typename?: 'Query' } & {
  listTodos: Maybe<
    { __typename?: 'ModelTodoConnection' } & {
      items: Maybe<
        Array<
          Maybe<
            { __typename?: 'Todo' } & Pick<
              Todo,
              'description' | 'id' | 'isDone'
            > & {
                createdAt: { __typename?: 'Date' } & Pick<
                  Date,
                  'dateLongForm' | 'dayOfMonth' | 'dayOfWeek' | 'month'
                >
              }
          >
        >
      >
    }
  >
}

export type CreateTodoMutationVariables = {
  description: Scalars['String']
}

export type CreateTodoMutation = { __typename?: 'Mutation' } & {
  createTodo: Maybe<
    { __typename?: 'Todo' } & Pick<Todo, 'id' | 'description' | 'isDone'> & {
        createdAt: { __typename?: 'Date' } & Pick<
          Date,
          'dateLongForm' | 'dayOfMonth' | 'dayOfWeek' | 'month'
        >
        updatedAt: { __typename?: 'Date' } & Pick<
          Date,
          'dateLongForm' | 'dayOfMonth' | 'dayOfWeek' | 'month'
        >
      }
  >
}

export type UpdateTodoMutationVariables = {
  id: Scalars['ID']
  isDone?: Maybe<Scalars['Boolean']>
  description?: Maybe<Scalars['String']>
}

export type UpdateTodoMutation = { __typename?: 'Mutation' } & {
  updateTodo: Maybe<
    { __typename?: 'Todo' } & Pick<Todo, 'id' | 'description' | 'isDone'> & {
        createdAt: { __typename?: 'Date' } & Pick<
          Date,
          'dateLongForm' | 'dayOfMonth' | 'dayOfWeek' | 'month'
        >
        updatedAt: { __typename?: 'Date' } & Pick<
          Date,
          'dateLongForm' | 'dayOfMonth' | 'dayOfWeek' | 'month'
        >
      }
  >
}

import gql from 'graphql-tag'
import * as React from 'react'
import * as ReactApollo from 'react-apollo'

export const ListTodosDocument = gql`
  query ListTodos {
    listTodos {
      items {
        description
        id
        isDone
        createdAt {
          dateLongForm
          dayOfMonth
          dayOfWeek
          month
        }
      }
    }
  }
`

export class ListTodosComponent extends React.Component<
  Partial<ReactApollo.QueryProps<ListTodosQuery, ListTodosQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<ListTodosQuery, ListTodosQueryVariables>
        query={ListTodosDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type ListTodosProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<ListTodosQuery, ListTodosQueryVariables>
> &
  TChildProps
export function withListTodos<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ListTodosQuery,
        ListTodosQueryVariables,
        ListTodosProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    ListTodosQuery,
    ListTodosQueryVariables,
    ListTodosProps<TChildProps>
  >(ListTodosDocument, operationOptions)
}
export const CreateTodoDocument = gql`
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

export class CreateTodoComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreateTodoMutation, CreateTodoMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreateTodoMutation, CreateTodoMutationVariables>
        mutation={CreateTodoDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type CreateTodoProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateTodoMutation, CreateTodoMutationVariables>
> &
  TChildProps
export type CreateTodoMutationFn = ReactApollo.MutationFn<
  CreateTodoMutation,
  CreateTodoMutationVariables
>
export function withCreateTodo<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateTodoMutation,
        CreateTodoMutationVariables,
        CreateTodoProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateTodoMutation,
    CreateTodoMutationVariables,
    CreateTodoProps<TChildProps>
  >(CreateTodoDocument, operationOptions)
}
export const UpdateTodoDocument = gql`
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

export class UpdateTodoComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UpdateTodoMutation, UpdateTodoMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UpdateTodoMutation, UpdateTodoMutationVariables>
        mutation={UpdateTodoDocument}
        {...(this as any)['props'] as any}
      />
    )
  }
}
export type UpdateTodoProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UpdateTodoMutation, UpdateTodoMutationVariables>
> &
  TChildProps
export type UpdateTodoMutationFn = ReactApollo.MutationFn<
  UpdateTodoMutation,
  UpdateTodoMutationVariables
>
export function withUpdateTodo<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UpdateTodoMutation,
        UpdateTodoMutationVariables,
        UpdateTodoProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UpdateTodoMutation,
    UpdateTodoMutationVariables,
    UpdateTodoProps<TChildProps>
  >(UpdateTodoDocument, operationOptions)
}
export interface IntrospectionResultData {
  __schema: {
    types: {
      kind: string
      name: string
      possibleTypes: {
        name: string
      }[]
    }[]
  }
}

const result: IntrospectionResultData = {
  __schema: {
    types: [],
  },
}

export default result
