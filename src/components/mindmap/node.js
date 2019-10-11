import React, { useState } from 'react'

import { styled } from 'linaria/react'

export const Node = props => {
  const [x, setX] = useState(props.x)
  const [y, setY] = useState(props.y)
  const [dragging, setDragging] = useState(false)

  const handleDrop = event => {
    event.preventDefault()
    setDragging(false)
  }

  const handleOnDrag = event => {
    event.preventDefault()
    const { x, y, width, height } = event.target.getBoundingClientRect()

    setX(event.clientX - width / 2)
    setY(event.clientY - height / 2)
    props.onMove(props.id, { x: x + width / 2, y: y + height / 2 })
  }

  const handleDragStart = () => {
    setDragging(true)
  }

  return (
    <Container
      onClick={event => {
        const { x, y, width, height } = event.target.getBoundingClientRect()
        props.onClick(props.id, {
          id: props.id,
          x: x + 100,
          y: y + 100,
          startX: x + width / 2,
          startY: y + height / 2
        })
      }}
      x={x}
      y={y}
      draggable
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
  background-color: white;
  border-radius: 20%;
  widht: auto;
  padding: 1em;
  height: auto;
  position: absolute;
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  opacity: ${props => (props.dragging ? '0.01' : '1')};
  cursor: grab;
`
