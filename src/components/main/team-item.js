import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useDispatch } from 'react-redux'

import { teamsActions } from '@symbiotes/teams'

import { StyledLink } from '../../ui/styled-link'

export const TeamItem = ({ name, id, isAdmin }) => {
  const dispatch = useDispatch()

  const setTeam = id => dispatch(teamsActions.selectTeam(id))

  const link = isAdmin ? `/team/settings/${id}` : `/teams/${id}`

  return (
    <Item onClick={() => setTeam(id)} key={id}>
      <StyledLink to={link} className={linkStyles}>
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
    background-color: var(--secondary);
  }
`

const Name = styled.b`
  box-sizing: border-box;
`
const linkStyles = css`
  justify-content: flex-start;
`
