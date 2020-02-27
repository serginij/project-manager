import React, { useState } from 'react'

import { styled } from 'linaria/react'

export const Node = props => {
  const [x, setX] = useState(props.x)
  const [y, setY] = useState(props.y)
  const [dragging, setDragging] = useState(false)

  const editable = props.editable

  const handleDrop = event => {
    event.preventDefault()
    setDragging(false)
  }

  const handleOnDrag = event => {
    event.preventDefault()
    const { width, height } = event.target.getBoundingClientRect()
    let newX = event.clientX - 30
    let newY = event.clientY - 16
    setX(newX)
    setY(newY)
    props.onMove(props.id, { x: newX + width / 2, y: newY + height / 2 })
  }

  const handleDragStart = () => {
    setDragging(true)
  }

  const handleAdd = event => {
    const { x, y, width, height } = event.target.getBoundingClientRect()
    props.onClick(props.id, {
      id: props.id,
      x: x + 100,
      y: y + 100,
      startX: x + width / 2,
      startY: y + height / 2,
      name: ''
    })
  }

  return (
    <Container
      onClick={handleAdd}
      x={x}
      y={y}
      draggable={editable}
      onDragOver={handleOnDrag}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      dragging={dragging}
    >
      {props.children}
    </Container>
  )
}

const Container = styled.div`
  background-color: var(--secondary__light);
  border-radius: 30%;
  min-width: 20px;
  padding: 0.5em;
  height: auto;
  position: absolute;
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  opacity: ${props => (props.dragging ? '0.01' : '1')};
  cursor: ${props => (props.draggable ? 'grab' : 'default')};
`
