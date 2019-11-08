import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { styled } from 'linaria/react'

// import { addColumn as createColumn } from '@symbiotes/helpers'
import { addColumn } from '@symbiotes/effects'

import { AddForm } from '../../ui/addForm'
import { ColumnsList } from './columns/columns-list'

export const Desk = () => {
  const { currentDesk } = useSelector(state => state.desks)
  const desk = useSelector(state => state.desks.desks[currentDesk])

  const dispatch = useDispatch()
  // const handleAddColumn = name => dispatch(addColumn(name, currentDesk))
  const handleAddColumn = name => dispatch(addColumn(name, currentDesk))

  return (
    currentDesk && (
      <>
        <h2>{desk.name}</h2>
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
  )
}

const DeskWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  box-sizing: border-box;
`
