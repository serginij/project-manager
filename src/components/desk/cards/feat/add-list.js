import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { Dropdown, Input, AddButton } from '@ui'
import { addList } from '@symbiotes/effects/'

export const AddList = ({ children }) => {
  let [name, setName] = useState('')

  let token = useSelector(state => state.auth.token)
  const cardId = useSelector(state => state.cards.currentCard)

  const dispatch = useDispatch()

  const handleChange = e => {
    setName(e.target.value)
  }

  const handleAddList = e => {
    e.preventDefault()
    dispatch(addList(cardId, name, token))
    setName('')
  }

  return (
    <Dropdown
      width={300}
      close={false}
      header={<Title>Добавление списка задач</Title>}
      content={
        <Content>
          <Label>Название</Label>
          <Input
            tabIndex={0}
            className={styledInput}
            placeholder="Название списка"
            onChange={handleChange}
            value={name}
            type="text"
          />
          <AddButton
            tabIndex={0}
            className={createButton}
            onClick={handleAddList}
          >
            Добавить
          </AddButton>
        </Content>
      }
    >
      {children}
    </Dropdown>
  )
}

const Label = styled.label`
  font-size: 14px;
  color: var(--secondary-text);
`

const Content = styled.div`
  padding: 12px;
  padding-top: 0px;
  box-sizing: border-box;
`

const Title = styled.p`
  color: var(--secondary-text);
  font-size: 14px;
  text-align: center;
  width: 100%;
`

const styledInput = css`
  margin-top: 8px;
  font-size: 14px;
`

const createButton = css`
  margin-top: 12px;
`
