import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Input, Button, AddButton } from '@ui'

export const EditLabel = ({ color = '', name = '', onClose }) => {
  const handleSubmit = () => {
    console.log('save label')
    onClose()
  }

  let [currentColor, setColor] = useState(color)
  let [text, setText] = useState(name)

  const handleChange = e => {
    setText(e.target.value)
  }

  let colors = [
    'ff0000',
    '00ff00',
    '0000ff',
    'ffff00',
    '00ffff',
    'ff00ff',
    'fff000',
    '000fff',
    'ff0f00',
    'f000ff'
  ]

  let list = colors.map(color => (
    <Color key={color} color={color} onClick={() => setColor(color)}>
      {color === currentColor && <p>&#x2713;</p>}
    </Color>
  ))

  return (
    <>
      <Label>Название</Label>
      <Input
        className={styledInput}
        placeholder="Поиск метки"
        onChange={handleChange}
        value={text}
      />
      <Label>Цвет</Label>
      <ColorsList>{list}</ColorsList>
      <ButtonsBlock>
        <AddButton onClick={handleSubmit}>Сохранить</AddButton>
        <Button className={delButton} onClick={onClose}>
          Удалить
        </Button>
      </ButtonsBlock>
    </>
  )
}

const Label = styled.label`
  font-size: 14px;
  color: var(--gray-text);
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
