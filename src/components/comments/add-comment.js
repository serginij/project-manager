import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { AddButton, CloseButton, DynamicTextarea } from '@ui'
import { addComment, updateComment } from '@symbiotes/effects'

export const AddComment = ({
  edit,
  value = '',
  onCancel,
  cardId,
  commentId
}) => {
  let [open, setOpen] = useState(edit)
  let [text, setText] = useState(value)

  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  let handleAddComment = () => {
    setOpen(false)
    dispatch(addComment(text, cardId, token))
    setText('')
  }

  let handleUpdateComment = () => {
    setOpen(false)
    dispatch(updateComment(cardId, commentId, text, token))
    setText('')
  }

  let unfocus = () => {
    if (text.trim() == '') {
      setOpen(false)
    }
  }

  let handleChange = e => {
    setText(e.target.value)
  }

  return (
    <AddBlock>
      <DynamicTextarea
        minRows={open ? 2 : 1}
        maxRows={5}
        className={styledInput}
        onClick={() => setOpen(true)}
        value={text}
        onChange={handleChange}
        onBlur={unfocus}
        placeholder="Напишите комментарий..."
      />
      {open ? (
        <ButtonsBlock>
          <AddButton
            disabled={text.trim() == '' ? true : false}
            onClick={edit ? handleUpdateComment : handleAddComment}
            className={styledButton}
          >
            Сохранить
          </AddButton>
          <CloseButton hidden={!edit} onClick={onCancel}>
            ×
          </CloseButton>
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
  border: 1px solid var(--dark-gray);
  border-bottom: 1px solid white;
  margin-bottom: 0;
  &:hover {
    border: 1px solid lightgray;
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
