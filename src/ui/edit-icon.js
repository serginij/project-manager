import React from 'react'
import { styled } from 'linaria/react'

import edit from '@assets/edit.svg'

export const EditIcon = ({
  handleEdit,
  size,
  visible = true,
  className,
  x = 0,
  y = 0
}) => (
  <EditButton
    tabIndex={0}
    onClick={handleEdit}
    size={size}
    visible={visible}
    className={className}
    x={x}
    y={y}
  >
    <img src={edit} alt="edit" width="80%" />
  </EditButton>
)

const EditButton = styled.button`
  display: ${props => (props.visible ? 'block' : 'none')};
  background: none;
  border: none;
  cursor: pointer;
  height: ${props => props.size + 'px'};
  width: ${props => props.size + 'px'};
  border-radius: 3px;
  left: ${props => props.x}px;
  top: ${props => props.y}px;

  &:hover {
    background-color: var(--secondary);
  }

  &:focus {
    outline: 2px solid var(--secondary__dark);
  }
`
