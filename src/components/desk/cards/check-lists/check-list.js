import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { ToggleInput, Button, ConfirmBlock } from '@ui/'
import {
  updateList,
  deleteList,
  addItem,
  deleteItem,
  updateItem
} from '@symbiotes/effects/'
import { CheckItem } from './check-item'
import { AddItem } from './add-item'
import { Progress } from '../progress'

export const CheckList = ({ name = 'Список', list, cardId, listId }) => {
  let token = useSelector(state => state.auth.token)

  const dispatch = useDispatch()

  const handleEdit = item => {
    handleUpdateItem(item.text, item.id, !item.checked)
  }

  const handleUpdateItem = (text, id, checked) => {
    let itemChecked = list.filter(item => item.id === id)[0].checked

    dispatch(
      updateItem(
        cardId,
        listId,
        {
          id: id,
          text: text,
          checked: checked === undefined ? itemChecked : checked
        },
        token
      )
    )
  }

  const handleAddItem = text => {
    dispatch(addItem(cardId, listId, text, token))
  }

  const handleDeleteItem = id => {
    dispatch(deleteItem(cardId, listId, id, token))
  }

  const handleUpdateList = name => {
    dispatch(updateList(cardId, listId, name, token))
  }

  const handleDeleteList = () => {
    dispatch(deleteList(cardId, listId, token))
  }

  let checkList =
    list &&
    list.map(item => (
      <CheckItem
        key={item.id}
        item={item}
        onEdit={handleEdit}
        onUpdate={handleUpdateItem}
        onDelete={handleDeleteItem}
      />
    ))
  return (
    <Wrapper>
      <Header>
        <ToggleInput
          onSubmit={handleUpdateList}
          text={name}
          inputStyle={inputStyle}
        />
        <ConfirmBlock
          onConfirm={handleDeleteList}
          title="Удаление списка задач"
          buttonText="Удалить список задач"
        >
          <Button>Удалить</Button>
        </ConfirmBlock>
      </Header>
      <Progress lists={list} type="singlelist" />
      <List>{checkList}</List>
      <AddItem onAdd={handleAddItem} />
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
  background-color: var(--secondary__light);
  border-radius: 3px;
  box-sizing: border-box;
  align-items: center;
  height: 2em;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  margin-bottom: 12px;
`
