import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

import { columnsActions } from '@symbiotes/columns'

import { CloseButton } from '@ui/close-button'

export const Card = ({ text, columnId, id }) => {
  const [visible, setVisible] = useState(true)
  const handleHover = () => {
    setVisible(!visible)
  }

  const dispatch = useDispatch()

  const handleDeleteCard = () =>
    dispatch(columnsActions.deleteCard(columnId, id))

  return (
    <Wrapper onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <Text>{text}</Text>
      <DeleteButton hidden={visible} onClick={handleDeleteCard}>
        ×
      </DeleteButton>
    </Wrapper>
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
