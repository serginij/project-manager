import React, { useState, useRef, useEffect } from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import { AddForm, CloseButton } from '@ui'

import { deleteColumn, addCard, updateColumn } from '@symbiotes/effects'

import { CardsList } from '../cards/cards-list'

export const Column = ({ columnId }) => {
  const { cards, name, id } = useSelector(
    state => state.columns.columns[columnId]
  )
  const { token } = useSelector(state => state.auth)

  let [edit, setEdit] = useState(false)
  let [value, setValue] = useState(name)

  const dispatch = useDispatch()
  const inputRef = useRef(null)

  const handleAddCard = name => dispatch(addCard(name, columnId))
  const handleDeleteColumn = () => dispatch(deleteColumn(columnId))
  const handleUpdateColumn = name => dispatch(updateColumn(id, name, token))

  const handleSubmit = e => {
    e.preventDefault()
    handleUpdateColumn(value)
    setEdit(false)
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleOpenForm = () => {
    setEdit(true)
  }

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [edit])

  return (
    <ColumnWrapper>
      <ColumnHeader>
        {edit ? (
          <form onSubmit={handleSubmit} style={{ width: '85%' }}>
            <Input
              ref={inputRef}
              type="text"
              value={value}
              onChange={handleChange}
              onBlur={handleSubmit}
            />
          </form>
        ) : (
          <Name onClick={handleOpenForm}>{name}</Name>
        )}
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
  background-color: var(--dark-gray);
  box-sizing: border-box;
  /* padding: 8px; */
  list-style: none;
  margin-right: 12px;
  min-width: 300px;
  border-radius: 3px;
  max-height: 80vh;
`
const Name = styled.h4`
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  margin: 12px 0 12px 8px;
  cursor: pointer;
  &:last-child {
    padding-bottom: 0;
  }
`

const ColumnHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  box-sizing: border-box;
  padding: 0 12px;
`

const Input = styled.input`
  font-size: 1rem;
  width: 100%;
  padding: 0;
  padding-left: 8px;
  margin: 12px 0;
  width: 100%;
`
