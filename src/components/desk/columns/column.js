import React from 'react'
import { styled } from 'linaria/react'

import { AddForm } from '../../../ui/addForm'

export const Column = ({ columnId }) => (
  <ColumnWrapper>
    <p>{`column ${columnId}`}</p>
    <AddForm
      onAdd={() => console.log('card added')}
      buttonText="Добавить карточку"
      inputText="Добавить еще одинy карточку"
      placeholder="Название карточки"
      type="card"
    />
  </ColumnWrapper>
)

const ColumnWrapper = styled.li`
  display: flex;
  flex-direction: column;
  background-color: #dfe3e6;
  box-sizing: border-box;
  /* padding: 8px; */
  list-style: none;
  margin-right: 12px;
  min-width: 300px;
`
