import React from 'react'
import { styled } from 'linaria/react'
import { useDispatch, useSelector } from 'react-redux'

import { getDesk } from '@symbiotes/effects'
import { StyledLink } from '@ui/styled-link'

import { DeskItem } from './desk-item'

export const DeskList = ({ title, desksById }) => {
  const { desks } = useSelector(state => state.desks)

  const dispatch = useDispatch()

  const handleClick = id => {
    dispatch(getDesk(id))
  }

  let deskList = desksById
    ? desksById.map(deskId => {
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
    : null

  return (
    <div>
      <h3>{title}</h3>
      <List>
        {deskList}
        <StyledLink to="/create-desk">Создать доску</StyledLink>
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
