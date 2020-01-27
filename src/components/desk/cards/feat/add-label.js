import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Dropdown, Input, Button, CloseButton } from '@ui'
import edit from '@assets/edit.svg'

import { EditLabel } from './edit-label'

export const AddLabel = ({ children }) => {
  let [labels, setLabels] = useState([
    {
      id: 0,
      color: 'ff0000',
      text: 'one',
      checked: false
    },
    {
      id: 1,
      color: 'ffff00',
      text: '',
      checked: true
    },
    {
      id: 2,
      color: 'ff00ff',
      text: '',
      checked: false
    },
    {
      id: 3,
      color: '7CB342',
      text: 'four',
      checked: true
    },
    {
      id: 4,
      color: '0000ff',
      text: 'five',
      checked: false
    }
  ])

  let [isEdit, setEdit] = useState(false)

  const handleEdit = () => {
    setEdit(!isEdit)
  }

  const setLabel = id => {
    let newLabels = labels.map(label => {
      if (label.id === id) {
        label = {
          ...label,
          checked: !label.checked
        }
      }
      return label
    })
    setLabels(newLabels)
  }

  let list =
    labels &&
    labels.map(label => (
      <LabelItem key={label.id}>
        <Label onClick={() => setLabel(label.id)} color={label.color}>
          <p>{label.text}</p>
          {label.checked && <p>&#x2713;</p>}
        </Label>
        <EditButton onClick={handleEdit}>
          <img src={edit} alt="edit" width="50%" />
        </EditButton>
      </LabelItem>
    ))

  const handleChange = e => {
    // searchUser(e.target.value)
    console.log(e.target.value)
  }

  return (
    <Dropdown
      width={300}
      close={false}
      header={
        isEdit ? (
          <EditTitle>
            <CloseButton className={backButton} onClick={handleEdit}>
              {'〱'}
            </CloseButton>
            <Title>Изменение метки</Title>
          </EditTitle>
        ) : (
          <Title>Метки</Title>
        )
      }
      content={
        <Content>
          {isEdit ? (
            <EditLabel onClose={handleEdit} />
          ) : (
            <>
              <Input
                className={styledInput}
                placeholder="Поиск меток"
                onChange={handleChange}
              />
              <LabelList>{list}</LabelList>
              <Button className={createButton} onClick={handleEdit}>
                Создать новую метку
              </Button>
            </>
          )}
        </Content>
      }
    >
      {children}
    </Dropdown>
  )
}

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
  font-size: 14px;
`

const LabelList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`

const LabelItem = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 8px;
`

const Label = styled.div`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 12px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
  height: 3em;
  background-color: ${props => '#' + props.color};
  color: white;
  margin-right: 8px;
  border: 1px solid black;

  &:hover {
    /* box-shadow: -8px 0 var(--gray-selection); */
    padding-left: 16px;
    box-shadow: -8px 0 ${props => '#' + props.color};
    cursor: pointer;
  }
`

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: 42px;
  width: 42px;
  border-radius: 3px;

  &:hover {
    background-color: var(--dark-gray);
  }
`

const createButton = css`
  margin-top: 12px;
  width: 100%;
  height: 3em;
`

const EditTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const backButton = css`
  font-size: 1em;
`
