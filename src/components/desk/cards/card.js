import React, { useState } from 'react'
import { styled } from 'linaria/react'
// import { css } from 'linaria'
import { useDispatch } from 'react-redux'

import { deleteCard } from '@symbiotes/effects'

import { CloseButton } from '@ui'
import { EditCard } from './edit-card'

export const Card = ({ text, columnId, id }) => {
  const [visible, setVisible] = useState(true)
  const [edit, setEdit] = useState(false)
  // const [value, setValue] = useState(text)

  const handleHover = () => {
    setVisible(!visible)
  }

  const dispatch = useDispatch()

  const handleDeleteCard = e => {
    e.stopPropagation()
    dispatch(deleteCard(columnId, id))
  }

  // const handleEditCard = card =>
  //   dispatch(updateCard(card.id, columnId, card.name))

  const handleClick = () => {
    setEdit(!edit)
    setVisible(true)
  }

  // const handleChange = e => {
  //   setValue(e.target.value)
  // }

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   handleEditCard({ name: value, id: id })
  //   handleClick()
  // }

  return (
    <>
      <Wrapper
        onMouseEnter={handleHover}
        onMouseLeave={() => setVisible(true)}
        onClick={handleClick}
      >
        <Text>{text}</Text>
        <CloseButton hidden={visible} onClick={handleDeleteCard}>
          ×
        </CloseButton>
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

// const Edit = styled.div`
//   width: 100%;
//   margin-bottom: 8px;
//   box-sizing: border-box;
// `

// const Input = styled.input`
//   display: block;
//   width: 100%;
//   background: #ffffff;
//   font-size: 1em;
//   min-height: 2.5rem;
//   border: none;
//   border-radius: 3px;
//   margin-bottom: 8px;
//   box-sizing: border-box;
//   padding: 0 12px;
//   word-wrap: break-word;
// `

// const cancelButton = css`
//   background-color: #e74c3c;
//   margin-left: 12px;
//   cursor: pointer;
// `
