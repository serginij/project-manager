import React, { useState } from 'react'
import { css } from 'linaria'

import { Button, AddUpdateElement } from '@ui'

export const AddItem = ({ onAdd }) => {
  let [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open)
  const handleAdd = text => {
    onAdd(text)
    handleOpen()
  }

  return open ? (
    <AddUpdateElement
      onCancel={handleOpen}
      onBlur={handleOpen}
      isOpen
      closable
      focus
      addElement={handleAdd}
      className={elementStyle}
      placeholder="Добавить элемент"
    />
  ) : (
    <Button onClick={handleOpen}>Добавить элемент</Button>
  )
}

const elementStyle = css`
  background-color: inherit;
  margin: 0;

  textarea {
    margin-top: 0;
  }

  button {
    margin-left: 0;
  }
`
