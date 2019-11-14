import React from 'react'
import { styled } from 'linaria/react'

import { StyledLink } from '@ui'

import { TeamItem } from './team-item'

export const TeamList = ({ teams }) => {
  let teamList = teams
    ? teams.map(team => (
        <TeamItem name={team.name} key={team.id} id={team.id} />
      ))
    : null

  return (
    <div style={{ width: '30%', minWidth: '200px' }}>
      <Teams>
        <ListHeader>
          <h3>Команды</h3>
          <AddTeam>
            <StyledLink to="/create-team">+</StyledLink>
          </AddTeam>
        </ListHeader>
        <List>{teamList}</List>
      </Teams>
    </div>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  width: 100%;
  padding: 0;
`

const Teams = styled.aside`
  width: 50%;
  min-width: 200px;
  margin: auto;
`

const AddTeam = styled.button`
  font: inherit;
  font-size: 2em;
  font-weight: 300;
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: rgba(0, 125, 215, 0);
  color: #6b808c;
  &:hover {
    color: black;
  }
`

const ListHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`
