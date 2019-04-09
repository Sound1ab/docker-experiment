import React from 'react'
import { TOGGLES } from '../../../enums'
import { IEvent } from '../../../interfaces'
import { styled } from '../../../theme'
import { Card } from '../../molecules'

const Style = styled.div`
  position: relative;

  > div {
    margin-top: ${({ theme }) => theme.spacing.xs};
  }
`

interface ICardList {
  events: IEvent[]
  activeToggle: TOGGLES
}

export function CardList({ events, activeToggle }: ICardList) {
  return (
    <Style>
      {events
        .filter(event =>
          activeToggle === TOGGLES.ALL
            ? event
            : activeToggle === TOGGLES.COMPLETE
            ? event.isDone
            : !event.isDone
        )
        .sort(
          (eventA, eventB) =>
            Number(new Date(eventB.createdAt.dateLongForm)) -
            Number(new Date(eventA.createdAt.dateLongForm))
        )
        .map(event => (
          <Card
            key={event.id}
            dayOfMonth={event.createdAt.dayOfMonth}
            dayOfWeek={event.createdAt.dayOfWeek}
            location={event.description}
            month={event.createdAt.month}
          />
        ))}
    </Style>
  )
}
