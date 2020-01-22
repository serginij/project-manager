import React, { useEffect, useCallback } from 'react'
import { styled } from 'linaria/react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTeams } from '@symbiotes/effects'
import { getToken } from '@symbiotes/helpers'
import { authActions } from '@symbiotes/auth'

import { DeskList } from './desk-list'
import { TeamList } from './team-list'

import { Spinner } from '@ui'

export const Main = () => {
  const { teams } = useSelector(state => state.teams)
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const getTeams = useCallback(token => dispatch(fetchTeams(token)), [dispatch])

  const setHidden = useCallback(val => dispatch(authActions.setHidden(val)), [
    dispatch
  ])

  useEffect(() => {
    dispatch(getToken())
    !!token && getTeams(token)
  }, [dispatch, getTeams, token])

  useEffect(() => {
    setHidden(false)
  }, [setHidden])

  const teamList = Object.values(teams)

  let desksList = teamList.length ? (
    teamList.map(team => {
      return (
        <DeskList
          teamId={team.id}
          key={team.id}
          title={team.name}
          desksById={team.desks}
          isAdmin={team.isAdmin}
        />
      )
    })
  ) : (
    <Spinner />
  )

  return (
    <Container>
      <TeamList teams={teamList} />
      <div className="desks">{desksList}</div>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  margin-top: 60px;
  justify-content: space-evenly;
  .desks {
    width: 60%;
  }
  @media (max-width: 850px) {
    .desks {
      width: 50%;
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-top: 30px;

    .desks {
      width: 80%;
    }
  }
`
