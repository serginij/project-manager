import React from 'react'
import { styled } from 'linaria/react'

import { StyledLink } from '../../ui/styled-link'

export const TeamItem = ({ name, id }) => (
  <Item key>
    <StyledLink to={`/teams/${id}`}>
      <Name>{name}</Name>
    </StyledLink>
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
