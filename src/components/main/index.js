import React from 'react'
import { styled } from 'linaria/react'

import { DeskList } from './desk-list'
import { TeamList } from './team-list'

const desks = [
  {
    name: 'One'
  },
  {
    name: 'Two'
  },
  {
    name: 'Three'
  }
]

export const Main = () => (
  <Container>
    <TeamList teams={desks} />
    <div>
      <DeskList title="Team 1" desks={desks} />
      <DeskList title="Team 2" desks={desks} />
      <DeskList title="Team 3" desks={desks} />
    </div>
  </Container>
)

const Container = styled.div`
  display: flex;
  margin-top: 60px;
`
