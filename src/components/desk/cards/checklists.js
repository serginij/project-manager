import React from 'react'
import { styled } from 'linaria/react'
import { useSelector } from 'react-redux'

import { CheckList } from './check-lists/check-list'

export const Checklists = ({ cardId }) => {
  const checklists = useSelector(state => state.cards.cards[cardId].checklists)

  const list = checklists.map(list => (
    <CheckList
      name={list.name}
      listId={list.id}
      list={list.items}
      cardId={cardId}
      key={list.id}
    />
  ))
  return <Wrapper>{list}</Wrapper>
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`
