import React from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import { AddForm } from '../../../ui/addForm'
import { addCard } from '@symbiotes/helpers'

import { CardsList } from '../cards/cards-list'

export const Column = ({ columnId }) => {
  const { cards, name } = useSelector(state => state.columns.columns[columnId])

  console.log(cards)

  const dispatch = useDispatch()

  const handleAddCard = name => dispatch(addCard(name, columnId))

  return (
    <ColumnWrapper>
      <Name>{name}</Name>
      <CardsList cardsById={cards} />
      <AddForm
        onAdd={handleAddCard}
        buttonText="Добавить карточку"
        inputText="Добавить еще одинy карточку"
        placeholder="Название карточки"
        type="card"
      />
    </ColumnWrapper>
  )
}

const ColumnWrapper = styled.li`
  display: flex;
  flex-direction: column;
  background-color: #dfe3e6;
  box-sizing: border-box;
  /* padding: 8px; */
  list-style: none;
  margin-right: 12px;
  min-width: 300px;
  border-radius: 3px;
`
const Name = styled.h3`
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  padding: 0 12px;
  &:last-child {
    padding-bottom: 0;
  }
`
