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
  margin: 2% 8px;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const Name = styled.p``
