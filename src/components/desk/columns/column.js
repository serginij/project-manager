import React from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import { AddForm } from '@ui/addForm'
import { CloseButton } from '@ui/close-button'

import { deleteColumn, addCard } from '@symbiotes/effects'

import { CardsList } from '../cards/cards-list'

export const Column = ({ columnId }) => {
  const { cards, name } = useSelector(state => state.columns.columns[columnId])

  const dispatch = useDispatch()

  const handleAddCard = name => dispatch(addCard(name, columnId))
  const handleDeleteColumn = () => dispatch(deleteColumn(columnId))

  return (
    <ColumnWrapper>
      <ColumnHeader>
        <Name>{name}</Name>
        <CloseButton onClick={handleDeleteColumn}>×</CloseButton>
      </ColumnHeader>
      <CardsList cardsById={cards} columnId={columnId} />
      <AddForm
        onAdd={handleAddCard}
        buttonText="Добавить карточку"
        inputText="Добавить еще однy карточку"
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
  /* padding: 0 12px; */
  &:last-child {
    padding-bottom: 0;
  }
`

const ColumnHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 12px;
`
