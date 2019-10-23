import React from 'react'
import { styled } from 'linaria/react'

export const DeskItem = ({ name }) => (
  <DeskIcon key>
    <Name>{name}</Name>
  </DeskIcon>
)

const DeskIcon = styled.li`
  display: flex;
  cursor: pointer;
  max-width: 48%;
  min-width: 160px;
  min-height: 100px;
  margin: 2% 8px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  border-radius: 3px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 6px -6px #777;
  }
`

const Name = styled.p``
