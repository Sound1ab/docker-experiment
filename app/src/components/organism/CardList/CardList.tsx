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
            : TOGGLES.COMPLETE
            ? event.isDone
            : !event.isDone
        )
        // .sort(
        //   (eventA, eventB) => eventA.date.dayOfMonth - eventB.date.dayOfMonth
        // )
        .map(event => (
          <Card
            key={event.id}
            dayOfMonth={13}
            dayOfWeek={'Thursday'}
            location={event.description}
            month={'Nov'}
          />
        ))}
    </Style>
  )
}
