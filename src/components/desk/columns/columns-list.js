import React from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { reorder, reorderCards } from '@lib/reorder'
import { desksActions } from '@symbiotes/desks'
import { columnsActions } from '@symbiotes/columns'

import { Column } from './column'

export const ColumnsList = ({ deskId }) => {
  const allColumns = useSelector(state => state.desks.desks[deskId].columns)
  const { columns } = useSelector(state => state.columns)

  const dispatch = useDispatch()

  const handleUpdateDesk = columns => {
    dispatch(desksActions.updateDesk({ id: deskId, columns: columns }))
  }

  const handleSetColumns = newColumns => {
    console.log(newColumns)
    dispatch(columnsActions.getColumns.done(newColumns))
  }

  const onDragEnd = result => {
    console.log(result)
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow = [...allColumns]
        shallow.splice(result.source.index, 1)
        handleUpdateDesk(shallow)
        return
      }

      const column = columns[result.source.droppableId]
      const withQuoteRemoved = [...column]
      withQuoteRemoved.splice(result.source.index, 1)
      const columns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved
      }
      handleSetColumns(columns)
      return
    }

    if (!result.destination) {
      return
    }

    const source = result.source
    const destination = result.destination
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    if (result.type === 'COLUMN') {
      const ordered = reorder(allColumns, source.index, destination.index)
      handleUpdateDesk(ordered)
      return
    }

    const data = reorderCards(columns, source, destination)

    handleSetColumns(data)
  }

  const columnsList =
    allColumns &&
    allColumns.map((id, index) => (
      <Column key={id} columnId={id} index={index} />
    ))
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" type="COLUMN" direction="horizontal">
        {provided => (
          <Wrapper ref={provided.innerRef} {...provided.droppableProps}>
            {columnsList}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  )
}

const Wrapper = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  align-items: flex-start;
  margin: 0;
  padding: 0;
`
