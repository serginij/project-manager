import React, { useState } from 'react'
import { styled } from 'linaria/react'

import edit from '@assets/edit.svg'
import del from '@assets/trash.png'

import { Node } from './node'

export const EditableNode = ({
  onClick,
  onMove,
  id,
  x,
  y,
  name,
  onRename,
  editable,
  onDelete
}) => {
  const [text, setText] = useState(name)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = event => {
    event.stopPropagation()
    if (editable) {
      if (isOpen) {
        onRename(id, text)
      }
      setIsOpen(!isOpen)
    }
  }

  const handleChange = event => {
    event.stopPropagation()
    editable && setText(event.target.value)
  }

  let nodeContent = isOpen ? (
    <>
      <Input
        type="text"
        onClick={e => {
          e.stopPropagation()
        }}
        onChange={handleChange}
        value={text}
      />
      {id > 1 && (
        <Button
          type="button"
          onClick={e => {
            e.stopPropagation()
            onDelete(id)
          }}
        >
          <img src={del} alt="delete node" width="18px" />
        </Button>
      )}
    </>
  ) : (
    <>{id ? text : 'Root'}</>
  )

  return (
    <Node
      onClick={onClick}
      onMove={onMove}
      onDelete={onDelete}
      id={id}
      x={x}
      y={y}
      editable={editable}
    >
      {nodeContent}
      {id && editable ? (
        <Button onClick={handleClick}>
          <img src={edit} alt="edit" width="15px" />
        </Button>
      ) : null}
    </Node>
  )
}

const Input = styled.input`
  width: 50%;
  height: 2em;
  border-radius: 3px;
  border: 1px solid var(--secondary__dark);
`

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  &::before {
    content: ' ';
  }
`
