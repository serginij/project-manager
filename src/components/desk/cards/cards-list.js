import React from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'linaria/react'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { Card } from './card'

export const CardsList = ({ cardsById, columnId, listType }) => {
  const { cards } = useSelector(state => state.cards)
  const cardsList = cardsById.map((id, index) => (
    <Draggable
      key={id}
      draggableId={id + ''}
      index={index}
      shouldRespectForceTouch={false}
    >
      {(dragProvided, dragSnapshot) => (
        <Card
          tabIndex={0}
          key={id}
          text={cards[id].name}
          columnId={columnId}
          id={id}
          card={cards[id]}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ))

  return (
    <Droppable droppableId={columnId + ''} type={listType}>
      {(dropProvided, dropSnapshot) => (
        <Wrapper
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          <DropZone ref={dropProvided.innerRef}>
            {cardsList}
            {dropProvided.placeholder}
          </DropZone>
        </Wrapper>
      )}
    </Droppable>
  )
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

const DropZone = styled.div`
  min-height: 4px;
  width: 100%;
`
