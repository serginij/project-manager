import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Dropdown, Input, AddButton } from '@ui'

export const AddList = ({ children }) => {
  let [isEdit, setEdit] = useState(false)

  const handleEdit = () => {
    setEdit(!isEdit)
  }

  const handleChange = e => {
    console.log(e.target.value)
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
            className={styledInput}
            placeholder="Название списка"
            onChange={handleChange}
          />
          <AddButton className={createButton} onClick={handleEdit}>
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
  color: var(--gray-text);
`

const Content = styled.div`
  padding: 12px;
  padding-top: 0px;
  box-sizing: border-box;
`

const Title = styled.p`
  color: var(--gray-text);
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
  /* width: 100%; */
  /* height: 3em; */
`
