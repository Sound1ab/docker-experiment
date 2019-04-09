import React, { useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { GoogleFont, TypographyStyle } from 'react-typography'
import { TOGGLES } from '../enums'
import { useData } from '../hooks'
import { IEvent } from '../interfaces'
import { client } from '../services/Apollo/clientConfig'
import { typography } from '../theme/typography'
import { Container } from './atoms'
import { Banner, Toggle } from './molecules'
import { CardList } from './organism'
import { GlobalStyle, ThemeProvider } from './utility'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ListTodosDocument = gql`
  {
    listTodos {
      items {
        description
        id
        isDone
      }
    }
  }
`

interface ITodo {
  id: number
  description: string
  isDone: boolean
}

export function App() {
  // const [data, loading] = useData<IEvent[]>()
  const [toggle, setToggle] = useState(TOGGLES.ALL)

  function handleToggle(
    activeToggle: TOGGLES,
    e: React.MouseEvent<HTMLElement>
  ) {
    e.preventDefault()
    setToggle(activeToggle)
  }

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <>
          <GlobalStyle />
          <TypographyStyle typography={typography} />
          <GoogleFont typography={typography} />
          <Container>
            <Banner text="Save a todo!" />
            <Toggle
              setToggle={handleToggle}
              toggles={[TOGGLES.COMPLETE, TOGGLES.INCOMPLETE, TOGGLES.ALL]}
              activeToggle={toggle}
            />
            <Query query={ListTodosDocument}>
              {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(</p>

                console.log(data)

                return (
                  <CardList
                    events={data.listTodos.items}
                    activeToggle={toggle}
                  />
                )
              }}
            </Query>
          </Container>
        </>
      </ThemeProvider>
    </ApolloProvider>
  )
}
