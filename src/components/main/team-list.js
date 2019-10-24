import React from 'react'
import { styled } from 'linaria/react'

import { TeamItem } from './team-item'

export const TeamList = ({ title, teams }) => {
  let deskList = teams
    ? teams.map(team => (
        <TeamItem name={team.name} key={team.id} id={team.id} />
      ))
    : null

  return (
    <div style={{ width: '30%' }}>
      <h3>{title}</h3>
      <List>
        {deskList}
        <TeamItem name="Создать команду" key="add" />
      </List>
    </div>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  /* width: 30%; */
  padding: 0;
`
