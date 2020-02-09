import React, { useState, useRef, useEffect } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { AddButton, CloseButton, DynamicTextarea } from './index'

export const AddUpdateElement = ({
  edit,
  value = '',
  onCancel = () => {},
  elementId,
  addElement,
  updateElement,
  className,
  isOpen = true,
  placeholder = '',
  closable,
  focus,
  minRows = 1,
  maxRows = 5
}) => {
  let [open, setOpen] = useState(isOpen)
  let [text, setText] = useState(value)
  let [rows, setRows] = useState(minRows)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  let handleAddElement = () => {
    setOpen(false)
    addElement(text)
    setText('')
    onCancel()
    setRows(minRows)
  }

  let handleUpdateElement = () => {
    setOpen(false)
    updateElement(text, elementId)
    onCancel()
    setRows(minRows)
  }

  let unfocus = () => {
    if (text.trim() == '') {
      setOpen(false)
      setRows(minRows)
      onCancel && onCancel()
    }
  }

  let handleChange = (e, rows = 2) => {
    setText(e.target.value)
    setRows(rows)
    // console.log(e)
  }

  let handleCancel = () => {
    setOpen(false)
    onCancel()
  }

  return (
    <AddBlock className={className}>
      <DynamicTextarea
        ref={focus && inputRef}
        minRows={open ? 2 : minRows}
        curRows={rows}
        maxRows={maxRows}
        className={styledInput}
        onClick={() => setOpen(true)}
        value={text}
        onChange={handleChange}
        onBlur={unfocus}
        placeholder={placeholder}
      />

      {open ? (
        <ButtonsBlock>
          <AddButton
            disabled={text.trim() == '' ? true : false}
            onClick={edit ? handleUpdateElement : handleAddElement}
            className={styledButton}
          >
            Сохранить
          </AddButton>
          <CloseButton hidden={!(edit || closable)} onClick={handleCancel} />
        </ButtonsBlock>
      ) : null}
    </AddBlock>
  )
}

const styledInput = css`
  font-size: 14px;
  cursor: pointer;
  overflow-wrap: break-word;
  min-height: 2em;
  box-sizing: border-box;
  height: auto;
  box-shadow: none;
  outline: 1px solid var(--dark-gray);
  outline-bottom: 1px solid white;
  margin-bottom: 0;
  &:hover {
    outline: 1px solid lightgray;
  }
  &:focus {
    outline: 1px solid var(--dark-gray);
  }
`

const styledButton = css`
  font-size: 14px;
  width: fit-content;
  margin: 8px 12px;
  &:focus {
    outline: 1px solid var(--dark-gray);
  }
`

const AddBlock = styled.section`
  background-color: white;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 12px;
  &:focus {
    box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  }
`

const ButtonsBlock = styled.div`
  display: flex;
  align-items: center;
`
