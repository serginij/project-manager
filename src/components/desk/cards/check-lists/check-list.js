import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { ToggleInput, Button, ConfirmBlock } from '@ui/'
import { CheckItem } from './check-item'
import { AddItem } from './add-item'

const test = [
  { id: 0, name: 'One', checked: false },
  { id: 1, name: 'Two', checked: true },
  { id: 2, name: 'Three', checked: false }
]

export const CheckList = ({ name = 'Список', list = test }) => {
  let [checkboxes, setCheckboxes] = useState(list)

  const handleEdit = id => {
    let newList = checkboxes.map(item => {
      if (item.id === id) {
        item.checked = !item.checked
      }
      return item
    })
    setCheckboxes(newList)
  }

  const handleUpdate = (text, id) => {
    let newList = [...checkboxes].map(item => {
      if (item.id === id) {
        item.name = text
      }
      return item
    })
    setCheckboxes(newList)
  }

  const handleAdd = text => {
    console.log('add check item')
    let newList = [...checkboxes]
    newList.push({ id: checkboxes.length, name: text, checked: false })
    setCheckboxes(newList)
  }

  let checkList = checkboxes.map(item => (
    <CheckItem
      key={item.id}
      item={item}
      onEdit={handleEdit}
      onUpdate={handleUpdate}
    />
  ))
  return (
    <Wrapper>
      <Header>
        <ToggleInput
          onSubmit={() => console.log('submit')}
          text={name}
          inputStyle={inputStyle}
        />
        <ConfirmBlock
          onConfirm={() => console.log('deleted')}
          title="Удаление списка задач"
          buttonText="Удалить список задач"
        >
          <Button>Удалить</Button>
        </ConfirmBlock>
      </Header>
      <Form>{checkList}</Form>
      <AddItem onAdd={handleAdd} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: 8px 0;
`
const inputStyle = css`
  font-size: 15px;
  font-weight: bold;
  height: 2em;
`
const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: var(--gray-background);
  border-radius: 3px;
  box-sizing: border-box;
  align-items: center;
  height: 2em;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  margin-bottom: 12px;
`
