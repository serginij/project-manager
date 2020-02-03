import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { AddUpdateElement } from '@ui'

import { Checkbox } from './checkbox'

export const CheckItem = ({ item, onUpdate, onEdit }) => {
  let [edit, setEdit] = useState(false)

  return (
    <Label onClick={e => e.preventDefault()} edit={edit}>
      <Checkbox
        value={item.name}
        checked={item.checked}
        onChange={() => onEdit(item.id)}
        onClick={() => onEdit(item.id)}
      />
      {edit ? (
        <AddUpdateElement
          edit
          value={item.name}
          onCancel={() => setEdit(false)}
          elementId={item.id}
          updateElement={onUpdate}
          className={elementStyle}
        />
      ) : (
        <Name
          onClick={() => setEdit(true)}
          role="button"
          tabIndex={0}
          onKeyPress={() => setEdit(true)}
        >
          {item.name}
        </Name>
      )}
    </Label>
  )
}

const Label = styled.label`
  display: flex;
  margin-top: 8px;
  border-radius: 3px;
  min-height: 2rem;
  align-items: ${props => (props.edit ? 'flex-start' : 'center')};

  &:hover {
    background-color: var(--dark-gray);
  }
  &:first-child {
    margin: 0;
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

const Name = styled.span`
  cursor: pointer;
`
