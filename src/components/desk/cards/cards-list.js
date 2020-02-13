import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'linaria/react'

import { Card } from './card'

export const CardsList = ({ cardsById, columnId }) => {
  const { cards } = useSelector(state => state.cards)
  const cardsList = cardsById.map(id => (
    <Card
      tabIndex={0}
      key={id}
      text={cards[id].name}
      columnId={columnId}
      id={id}
      card={cards[id]}
    />
  ))

  return <Wrapper>{cardsList}</Wrapper>
}

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 90%;
  box-sizing: border-box;
  width: 100%;
  padding: 0 12px;
  overflow-x: hidden;
`
