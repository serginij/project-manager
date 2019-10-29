import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'linaria/react'

import { Card } from './card'

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 90%;
  box-sizing: border-box;
  width: 100%;
  padding: 0 12px;
  overflow-y: scroll;
  overflow-x: hidden;

  /* pading-bottom: ${props => props.isDraggingOver && '40px'}; */
`

export const CardsList = ({ cardsById }) => {
  const { cards } = useSelector(state => state.cards)
  const cardsList = cardsById.map(id => <Card key={id} text={cards[id].name} />)

  return <Wrapper>{cardsList}</Wrapper>
}
