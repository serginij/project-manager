import React, { useState } from 'react'

import { styled } from 'linaria/react'

export const Node = props => {
  const [x, setX] = useState(50)
  const [y, setY] = useState(50)
  const [dragging, setDragging] = useState(false)

  const handleDrop = event => {
    event.preventDefault()
    // console.log(event.clientX)
    setDragging(false)
    props.onMove(props.id, { x: x, y: y - 50 })
  }

  const handleOnDrag = event => {
    event.preventDefault()
    setX(event.clientX - 20)
    setY(event.clientY - 25)
  }

  const handleDragStart = () => {
    // const falseImg = new Image()
    // event.dataTransfer.setDragImage(falseImg, x + 50, y + 25)
    setDragging(true)
    // console.log(dragging)
  }

  return (
    <Container
      onClick={() =>
        props.onClick(props.id, {
          id: props.id,
          x: 0,
          y: 0,
          startX: x,
          startY: y - 50
        })
      }
      x={x}
      y={y}
      draggable
      onDragOver={handleOnDrag}
      onDrop={handleDrop}
      onDragStart={handleDragStart}
      dragging={dragging}
    >
      Simple node {props.id}
    </Container>
  )
}

const Container = styled.div`
  background-color: lightgreen;
  width: 50px;
  height: 50px;
  position: absolute;
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  opacity: ${props => (props.dragging ? '0.01' : '1')};
  cursor: grab;
`
