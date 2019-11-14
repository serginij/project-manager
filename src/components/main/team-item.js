import React from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

import { teamsActions } from '@symbiotes/teams'

import { StyledLink } from '../../ui/styled-link'

export const TeamItem = ({ name, id }) => {
  const dispatch = useDispatch()

  const setTeam = id => dispatch(teamsActions.selectTeam(id))

  return (
    <Item onClick={() => setTeam(id)} key>
      <StyledLink to={`/teams/${id}`}>
        <Name>{name}</Name>
      </StyledLink>
    </Item>
  )
}

const Item = styled.li`
  display: flex;
  cursor: pointer;
  margin: 4px 0;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 6px 8px;

  &:hover {
    background-color: #eeeeee;
  }
`

const Name = styled.b`
  box-sizing: border-box;
`
