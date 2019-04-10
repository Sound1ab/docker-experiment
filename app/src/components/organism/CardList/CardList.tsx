import React from 'react'
import { TOGGLES } from '../../../enums'
import { styled } from '../../../theme'
import { Todo } from '../../apollo/generated_components_typings'
import { Card } from '../../molecules'

const Style = styled.div`
  position: relative;

  > div {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`

interface ICardList {
  events: Todo[]
  activeToggle: TOGGLES
}

export function CardList({ events, activeToggle }: ICardList) {
  return (
    <Style>
      {events
        .filter(event => {
          return activeToggle === TOGGLES.ALL
            ? event
            : activeToggle === TOGGLES.COMPLETE
            ? event.isDone
            : !event.isDone
        })
        .sort((eventA, eventB) => {
          return (
            Number(new Date(eventB.createdAt.dateLongForm)) -
            Number(new Date(eventA.createdAt.dateLongForm))
          )
        })
        .map(event => (
          <Card
            key={event.id}
            id={event.id}
            dayOfMonth={event.createdAt.dayOfMonth}
            dayOfWeek={event.createdAt.dayOfWeek}
            location={event.description}
            month={event.createdAt.month}
            isDone={event.isDone}
          />
        ))}
    </Style>
  )
}
