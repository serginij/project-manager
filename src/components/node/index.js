import React, { useState } from 'react'

import { styled } from 'linaria/react'

export const Node = props => {
  const [x, setX] = useState(props.x)
  const [y, setY] = useState(props.y)
  const [dragging, setDragging] = useState(false)

  const handleDrop = event => {
    event.preventDefault()
    // console.log(event.clientX)
    setDragging(false)
    // props.onMove(props.id, { x: x, y: y - 50 })
  }

  const handleOnDrag = event => {
    event.preventDefault()
    setX(event.clientX - 20)
    setY(event.clientY - 25)
    // props.onMove(props.id, { x: x + 20, y: y - 50 })
    // setX(event.clientX)
    // setY(event.clientY)

    props.onMove(props.id, { x: x + 20, y: y + 20 })
  }

  const handleDragStart = () => {
    // console.log(event.target.style)
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
          x: x + 100,
          y: y + 100,
          startX: x + 20,
          startY: y + 20
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
      {props.id ? `Simple node ${props.id}` : 'Root'}
    </Container>
  )
}

const Container = styled.div`
  background-color: white;
  border-radius: 20%;
  /* width: 50px; */
  widht: auto;
  /* height: 50px; */
  padding: 1em;
  height: auto;
  position: absolute;
  left: ${props => props.x + 'px'};
  top: ${props => props.y + 'px'};
  opacity: ${props => (props.dragging ? '0.01' : '1')};
  cursor: grab;
`
