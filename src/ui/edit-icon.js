import React from 'react'
import { styled } from 'linaria/react'

import edit from '@assets/edit.svg'

export const EditIcon = ({ handleEdit, size }) => (
  <EditButton tabIndex={0} onClick={handleEdit} size={size}>
    <img src={edit} alt="edit" width="80%" />
  </EditButton>
)

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  height: ${props => props.size + 'px'};
  width: ${props => props.size + 'px'};
  border-radius: 3px;

  &:hover {
    background-color: var(--dark-gray);
  }

  &:focus {
    outline: 2px solid var(--gray-selection);
  }
`
