import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { Input, Button, AddButton, CheckIcon } from '@ui'
import { addLabel, deleteLabel, updateLabel } from '@symbiotes/effects/'
import { colors } from '@lib/colors'

export const EditLabel = ({ color = '', name = '', onClose, labelId }) => {
  let [currentColor, setColor] = useState(color)
  let [text, setText] = useState(name)
  const deskId = useSelector(state => state.desks.currentDesk)

  const dispatch = useDispatch()

  const handleAddLabel = () => {
    if (labelId) {
      dispatch(
        updateLabel(deskId, { id: labelId, name: text, color: currentColor })
      )
    } else {
      dispatch(addLabel(deskId, { name: text, color: currentColor }))
    }
    onClose()
  }

  const handleDeleteLabel = () => {
    dispatch(deleteLabel(deskId, labelId))
    onClose()
  }

  const handleChange = e => {
    setText(e.target.value)
  }

  let list = colors.map(color => (
    <Color key={color} color={color} onClick={() => setColor(color)}>
      <CheckIcon checked={color === currentColor} size={16} thickness={3} />
    </Color>
  ))

  return (
    <>
      <Label>Название</Label>
      <Input
        className={styledInput}
        placeholder="Название метки"
        onChange={handleChange}
        value={text}
      />
      <Label>Цвет</Label>
      <ColorsList>{list}</ColorsList>
      <ButtonsBlock>
        <AddButton
          disabled={currentColor == '' && text == ''}
          onClick={handleAddLabel}
        >
          Сохранить
        </AddButton>
        <Button className={delButton} onClick={handleDeleteLabel}>
          Удалить
        </Button>
      </ButtonsBlock>
    </>
  )
}

const Label = styled.label`
  font-size: 14px;
  color: var(--secondary-text);
`

const ColorsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px 0;
`

const Color = styled.div`
  display: flex;
  height: 32px;
  margin: 0 8px 8px 0;
  padding: 0;
  width: 47px;
  border-radius: 4px;
  font-weight: 700;
  color: white;
  align-items: center;
  justify-content: center
  cursor: pointer;
  background-color: ${props => '#' + props.color};
`

const delButton = css`
  background-color: var(--red);
  color: white;
  height: 2rem;
  &:hover {
    background-color: var(--red);
  }
`

const styledInput = css`
  margin-top: 8px;
  font-size: 14px;
`

const ButtonsBlock = styled.article`
  display: flex;
  justify-content: space-evenly;
  margin-top: 8px;
  font-size: 14px;
`
