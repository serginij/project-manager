import React from 'react'
import { styled } from 'linaria/react'
import { useDispatch, useSelector } from 'react-redux'

import { getDesk } from '@symbiotes/effects/'
import { teamsActions } from '@symbiotes/teams'
import { StyledLink, Spinner } from '@ui'

import { DeskItem } from './desk-item'

export const DeskList = ({ title, desksById, teamId, isAdmin }) => {
  const { desks } = useSelector(state => state.desks)

  const dispatch = useDispatch()
  const setTeam = id => dispatch(teamsActions.selectTeam(id))

  const handleClick = id => {
    dispatch(getDesk(id))
    setTeam(teamId)
  }

  let deskList = desksById ? (
    desksById.map(deskId => {
      if (desks[deskId]) {
        let { id, name } = desks[deskId]
        return (
          <DeskItem
            name={name}
            key={id}
            id={id}
            onClick={() => handleClick(id)}
          />
        )
      }
    })
  ) : (
    <Spinner />
  )

  return (
    <div>
      <h3>{title}</h3>
      <List>
        {deskList}
        {isAdmin && (
          <AddDesk onClick={() => setTeam(teamId)}>
            <StyledLink to="/create-desk">
              <Text>Создать доску</Text>
            </StyledLink>
          </AddDesk>
        )}
      </List>
    </div>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  align-items: center;
  padding: 0;
`

const AddDesk = styled.li`
  display: flex;
  cursor: pointer;
  max-width: 48%;
  min-width: 160px;
  min-height: 100px;
  margin: 2% 8px;
  text-align: center;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary);
  border-radius: 3px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 6px -6px #777;
  }

  @media (max-width: 600px) {
    min-height: 90px;
    min-width: 130px;
  }

  @media (max-width: 400px) {
    min-height: 70px;
    min-width: 120px;
  }
`

const Text = styled.p`
  margin: 40px 0;
`
