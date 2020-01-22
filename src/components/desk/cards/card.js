import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

import { deleteCard } from '@symbiotes/effects'

import { CloseButton, ConfirmBlock } from '@ui'
import { EditCard } from './edit-card'

import { cardsActions } from '@symbiotes/cards'

export const Card = ({ text, columnId, id }) => {
  const [visible, setVisible] = useState(true)
  const [edit, setEdit] = useState(false)

  const handleHover = () => {
    setVisible(!visible)
  }

  const dispatch = useDispatch()

  const setCurrent = id => dispatch(cardsActions.setCurrent(id))

  const handleDeleteCard = e => {
    e.stopPropagation()
    dispatch(deleteCard(columnId, id))
  }

  const handleClick = () => {
    setEdit(!edit)
    setCurrent(id)
    setVisible(true)
  }

  return (
    <>
      <Wrapper
        onMouseEnter={handleHover}
        onMouseLeave={() => setVisible(true)}
        onClick={handleClick}
      >
        <Text>{text}</Text>
        <ConfirmBlock
          onClick={e => e.stopPropagation()}
          onConfirm={handleDeleteCard}
          title="Удаление карточки"
          buttonText="Удалить карточку"
        >
          <CloseButton hidden={visible} />
        </ConfirmBlock>
      </Wrapper>
      {edit && <EditCard cardId={id} onClick={handleClick} />}
    </>
  )
}

const Wrapper = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #ffffff;
  min-height: 2.5rem;
  border: none;
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 0 12px;
  box-sizing: border-box;
  word-wrap: break-word;
  max-width: 276px;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
`

const Text = styled.p`
  padding: 8px 0;
  margin: 0;
  word-break: break-all;
`
