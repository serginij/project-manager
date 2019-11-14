import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

import { deleteCard, updateCard } from '@symbiotes/effects'

import { CloseButton, AddButton } from '@ui'

export const Card = ({ text, columnId, id }) => {
  const [visible, setVisible] = useState(true)
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(text)

  const handleHover = () => {
    setVisible(!visible)
  }

  const dispatch = useDispatch()

  const handleDeleteCard = () => dispatch(deleteCard(columnId, id))

  const handleEditCard = card =>
    dispatch(updateCard(card.id, columnId, card.name))

  const handleClick = () => {
    setEdit(!edit)
    setVisible(true)
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    handleEditCard({ name: value, id: id })
    handleClick()
  }

  return (
    <>
      {edit ? (
        <Popup>
          <Input type="text" value={value} onChange={handleChange} />
          <AddButton onClick={handleSubmit}>save</AddButton>
          <CancelButton onClick={handleClick}>cancel</CancelButton>
        </Popup>
      ) : (
        <Wrapper
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          onClick={handleClick}
        >
          <Text>{text}</Text>
          <DeleteButton hidden={visible} onClick={handleDeleteCard}>
            ×
          </DeleteButton>
        </Wrapper>
      )}
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
  &:last-child {
    margin-bottom: 0;
  }
`

const Text = styled.p`
  padding: 8px 0;
  margin: 0;
`

const DeleteButton = styled(CloseButton)`
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
`

const Popup = styled.div`
  width: 100%;
  box-sizing: border-box;
`

const Input = styled.input`
  display: block;
  width: 100%;
  background: #ffffff;
  font-size: 1em;
  min-height: 2.5rem;
  border: none;
  border-radius: 3px;
  margin-bottom: 8px;
  box-sizing: border-box;
  padding: 0 12px;
  word-wrap: break-word;
`

const CancelButton = styled(AddButton)`
  background-color: #cccccc;
  cursor: pointer;
`
