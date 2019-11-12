import React, { useEffect, useCallback } from 'react'
import { styled } from 'linaria/react'

import { useSelector, useDispatch } from 'react-redux'

import { fetchTeams } from '@symbiotes/effects'

import { DeskList } from './desk-list'
import { TeamList } from './team-list'

export const Main = () => {
  const { teams } = useSelector(state => state.teams)
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const getTeams = useCallback(token => dispatch(fetchTeams(token)), [dispatch])

  useEffect(() => {
    getTeams(token)
    console.log(token)
  }, [getTeams, token])

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
