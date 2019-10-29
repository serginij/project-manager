import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'linaria/react'

import { addColumn } from '@symbiotes/helpers'

import { AddForm } from '../../ui/addForm'
import { ColumnsList } from './columns/columns-list'

export const Desk = () => {
  const { currentDesk } = useSelector(state => state.desks)

  const dispatch = useDispatch()
  const handleAddColumn = name => dispatch(addColumn(name, currentDesk))

  return (
    <>
      <h2>Desk template</h2>
      <DeskWrapper>
        <ColumnsList deskId={currentDesk} />
        <AddForm
          onAdd={handleAddColumn}
          buttonText="Добавить столбец"
          inputText="Добавить еще один столбец"
          placeholder="Название столбца"
          type="column"
        />
      </DeskWrapper>
    </>
  )
}

const DeskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
`
