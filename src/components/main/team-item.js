import React from 'react'
import { styled } from 'linaria/react'

export const TeamItem = ({ name }) => (
  <Item key>
    <Name>{name}</Name>
  </Item>
)

const Item = styled.li`
  display: flex;
  cursor: pointer;
  margin: 8px 0;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  background-color: #eeeeee;
  border-radius: 3px;
`

const Name = styled.p``
