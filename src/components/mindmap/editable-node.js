import React, { useState } from 'react'
import { styled } from 'linaria/react'

import edit from '@assets/edit.svg'

import { Node } from './node'

export const EditableNode = ({ onClick, onMove, id, x, y, name, onRename }) => {
  const [text, setText] = useState(name)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = event => {
    event.stopPropagation()
    setIsOpen(!isOpen)
    onRename(id, text)
  }

  const handleChange = event => {
    event.stopPropagation()
    setText(event.target.value)
  }

  let nodeContent = isOpen ? (
    <Input
      type="text"
      onClick={e => {
        e.stopPropagation()
      }}
      onChange={handleChange}
      value={text}
    />
  ) : (
    <>{id ? text : 'Root'}</>
  )

  return (
    <Node onClick={onClick} onMove={onMove} id={id} x={x} y={y}>
      {nodeContent}
      {id ? (
        <Button onClick={handleClick}>
          <img src={edit} alt="edit" width="15px" />
        </Button>
      ) : null}
    </Node>
  )
}

const Input = styled.input`
  width: 50%;
`

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &::before {
    content: ' ';
  }
`
