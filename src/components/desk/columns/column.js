import React from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import { AddForm, CloseButton, ToggleInput, ConfirmBlock } from '@ui'
import { deleteColumn, addCard, updateColumn } from '@symbiotes/effects/'
import { CardsList } from '../cards/cards-list'

export const Column = ({ columnId, index }) => {
  const { cards, name, id } = useSelector(
    state => state.columns.columns[columnId]
  )
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleAddCard = name => dispatch(addCard(name, columnId))
  const handleDeleteColumn = () => dispatch(deleteColumn(columnId))
  const handleUpdateColumn = name => dispatch(updateColumn(id, name, token))

  return (
    <Draggable draggableId={columnId + ''} index={index}>
      {(provided, snapshot) => (
        <ColumnWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ColumnHeader isDragging={snapshot.isDragging}>
            <ToggleInput onSubmit={handleUpdateColumn} text={name} />
            <ConfirmBlock
              onConfirm={handleDeleteColumn}
              title="Удаление столбца"
              buttonText="Удалить столбец"
            >
              <CloseButton />
            </ConfirmBlock>
          </ColumnHeader>
          <CardsList
            listType="CARDS"
            tabIndex={0}
            cardsById={cards}
            columnId={columnId}
          />
          <AddForm
            onAdd={handleAddCard}
            buttonText="Добавить карточку"
            inputText="Добавить еще однy карточку"
            placeholder="Название карточки"
            type="card"
          />
        </ColumnWrapper>
      )}
    </Draggable>
  )
}

const ColumnWrapper = styled.li`
  display: flex;
  flex-direction: column;
  background-color: var(--secondary);
  box-sizing: border-box;
  list-style: none;
  margin-right: 12px;
  min-width: 300px;
  border-radius: 3px;
  max-height: 80vh;
`

const ColumnHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 12px;
`
