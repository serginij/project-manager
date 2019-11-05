import React from 'react'
import { styled } from 'linaria/react'

import { useSelector } from 'react-redux'

import { DeskList } from './desk-list'
import { TeamList } from './team-list'

export const Main = () => {
  let { teams } = useSelector(state => state.teams)

  const teamList = Object.values(teams)

  let desksList = teamList.map(team => {
    return <DeskList key={team.id} title={team.name} desksById={team.desks} />
  })

  return (
    <Container>
      <TeamList teams={teamList} />
      <div style={{ width: '70%' }}>{desksList}</div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  margin-top: 60px;
`
