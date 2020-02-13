import React, { useState, useEffect } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useDispatch } from 'react-redux'

import { Dropdown, Input, Button, CloseButton, EditIcon, CheckIcon } from '@ui'
import { addCardLabel, deleteCardLabel } from '@symbiotes/effects/'

import { EditLabel } from './edit-label'

export const AddLabel = ({ children, allLabels, cardLabels, cardId }) => {
  const [color, setColor] = useState('')
  const [id, setId] = useState(null)
  let [isEdit, setEdit] = useState(false)
  const [labels, setLabels] = useState(null)

  useEffect(() => {
    setLabels(
      allLabels &&
        Object.values(allLabels).map(label => {
          if (cardLabels.includes(label.id)) {
            return { ...label, checked: true }
          }
          return { ...label, checked: false }
        })
    )
  }, [allLabels, cardLabels])

  const dispatch = useDispatch()

  const handleAddLabel = id => {
    let label = labels.filter(label => label.id === id)[0]
    if (label.checked) {
      dispatch(deleteCardLabel(cardId, id))
    } else {
      dispatch(addCardLabel(cardId, id))
    }
  }

  const findLabel = e => {
    let newLabels = [...labels]
    let val = e.target.value.trim()
    if (!val.length) {
      newLabels =
        allLabels &&
        Object.values(allLabels).map(label => {
          if (cardLabels.includes(label.id)) {
            return { ...label, checked: true }
          }
          return { ...label, checked: false }
        })
    }

    setLabels(newLabels.filter(label => label.name.includes(val)))
  }

  const handleEdit = (color = '', id = null) => {
    setEdit(!isEdit)
    setColor(color)
    setId(id)
  }

  let list =
    labels &&
    labels.map(label => (
      <LabelItem key={label.id}>
        <Label
          tabIndex={0}
          onClick={() => handleAddLabel(label.id)}
          color={label.color}
        >
          <p>{label.name}</p>
          <CheckIcon checked={label.checked} size={18} thickness={3} />
        </Label>
        <EditIcon
          size={35}
          handleEdit={() => handleEdit(label.color, label.id)}
        />
      </LabelItem>
    ))

  return (
    <Dropdown
      width={300}
      close={false}
      header={
        isEdit ? (
          <EditTitle>
            <CloseButton
              className={backButton}
              onClick={handleEdit}
              type="button"
            >
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
            <EditLabel labelId={id} color={color} onClose={handleEdit} />
          ) : (
            <>
              <Input
                className={styledInput}
                placeholder="Поиск меток"
                onChange={findLabel}
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
  color: var(--secondary-text);
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
  margin-top: 6px;
`

const Label = styled.div`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
  height: 2.5em;
  background-color: ${props => '#' + props.color};
  color: white;
  margin-right: 8px;

  &:hover {
    padding-left: 16px;
    box-shadow: -4px 0 ${props => '#' + props.color};
    cursor: pointer;
  }

  &:focus {
    padding-left: 16px;
    outline: 1px solid var(--secondary);
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
