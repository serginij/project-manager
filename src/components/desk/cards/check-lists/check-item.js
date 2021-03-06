import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { AddUpdateElement, Dropdown, Icon } from '@ui'
import more from '@assets/more.png'

import { Checkbox } from './checkbox'

export const CheckItem = ({ item, onUpdate, onEdit, onDelete }) => {
  let [edit, setEdit] = useState(false)

  return (
    <Item onClick={e => e.preventDefault()} edit={edit}>
      <Checkbox
        value={item.text}
        checked={item.checked}
        onChange={() => onEdit(item.id)}
        onClick={() => onEdit(item)}
      />
      {edit ? (
        <AddUpdateElement
          edit
          value={item.text}
          onCancel={() => setEdit(false)}
          elementId={item.id}
          updateElement={onUpdate}
          className={elementStyle}
        />
      ) : (
        <Content>
          <Name
            onClick={() => setEdit(true)}
            role="button"
            tabIndex={0}
            onKeyPress={() => setEdit(true)}
          >
            {item.text}
          </Name>
          <Dropdown
            width={250}
            close={false}
            header={<Title>Действие</Title>}
            content={
              <Button
                className={deleteButton}
                type="button"
                onClick={() => {
                  onDelete(item.id)
                }}
              >
                Удалить
              </Button>
            }
          >
            <Button type="button">
              <Icon src={more} alt="more" width={18} height={18} />
            </Button>
          </Dropdown>
        </Content>
      )}
    </Item>
  )
}

const Item = styled.div`
  display: flex;
  margin-top: 8px;
  border-radius: 3px;
  min-height: 2rem;
  align-items: ${props => (props.edit ? 'flex-start' : 'center')};

  &:hover {
    background-color: var(--secondary);
  }
  &:first-child {
    margin: 0;
  }
`

const Content = styled.div`
  cursor: pointer;
  height: 2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    button {
      visibility: visible;
    }
  }
`

const elementStyle = css`
  background-color: inherit;
  width: 100%;
  margin: 0;

  textarea {
    margin-top: 0;
  }

  button {
    margin-left: 0;
  }
`

const Name = styled.p`
  width: 100%;
  font-size: 14px;
`

const Button = styled.button`
  display: flex;
  border: none;
  background-color: inherit;
  cursor: pointer;
  box-sizing: border-box;
  font-size: 1.5em;
  text-align: center;
  border-radius: 3px;
  padding: 4px;
  margin-right: 4px;
  /* height: 1.5rem;
  width: 1.5rem; */
  /* margin-right 10px; */
  visibility: hidden;
  align-items: center;
  /* padding-bottom: 18px; */
  &:hover {
    background-color: var(--secondary__dark);
  }
`

const deleteButton = css`
  width: 100%;
  padding-left: 8px;
  height: 2rem;
  visibility: visible;
  border-radius: 0;
  font-size: 14px;
  text-align: left;
`

const Title = styled.p`
  color: var(--secondary-text);
  font-size: 14px;
  text-align: center;
  width: 100%;
`

// const Icon = styled.img`
//   width: 18px;
//   height: 18px;
// `
