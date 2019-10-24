import React from 'react'
import { styled } from 'linaria/react'

import { useSelector } from 'react-redux'

import { DeskList } from './desk-list'
import { TeamList } from './team-list'

export const Main = () => {
  const { desks } = useSelector(state => state.desks)

  return (
    <Container>
      <TeamList teams={desks} />
      <div>
        <DeskList title="Team 1" desks={desks} />
        <DeskList title="Team 2" desks={desks} />
        <DeskList title="Team 3" desks={desks} />
      </div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  margin-top: 60px;
`
