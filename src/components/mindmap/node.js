import React, { useState } from 'react'

import { styled } from 'linaria/react'

export const Node = props => {
  const [x, setX] = useState(props.x)
  const [y, setY] = useState(props.y)
  const [dragging, setDragging] = useState(false)

  const editable = props.editable

  const handleDrop = event => {
    event.preventDefault()
    const { width, height } = event.target.getBoundingClientRect()
    let newX = event.clientX - 30
    let newY = event.clientY - 16
    setX(newX)
    setY(newY)
    props.onMove(props.id, { x: newX + width / 2, y: newY + height / 2 })
    setDragging(false)
  }

  const handleOnDrag = event => {
    event.preventDefault()

    let newX = event.clientX - 30
    let newY = event.clientY - 16
    setX(newX)
    setY(newY)
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

  let label = null
  switch (props.level) {
    case 1:
      label = 'доска'
      break
    case 2:
      label = 'столбец'
      break
    case 3:
      label = 'карточка'
      break
    case 4:
      label = 'задача'
      break
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
      {label && <Type>{label}</Type>}
      {props.children}
    </Container>
  )
}

const Container = styled.div`
  background-color: var(--secondary__light);
  position: relative;
  border-radius: 5px;
  min-width: 20px;
  padding: 1.5em 0.5em 0.5em 1.3em;
  height: auto;
  position: absolute;
  display: flex;
  align-items: center;
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  /* margin: 8px; */
  /* &:-webkit-user-drag {
    margin: 0;
  } */
  /* margin-left: ${props => (props.dragging ? '4px' : '0')}; */
  /* opacity: ${props => (props.dragging ? '0.01' : '1')}; */
  cursor: ${props => (props.draggable ? 'grab' : 'default')};
`

const Type = styled.p`
  position: absolute;
  color: var(--secondary-color);
  background-color: var(--secondary__light);
  font-size: 12px;
  font-weight: 300;
  top: 0.5em;
  left: 0.5em;
  margin: 0;
`
