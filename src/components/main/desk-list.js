import React from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

// import { desksActions } from '@symbiotes/desks'
import { getDesk } from '@symbiotes/effects'
import { StyledLink } from '@ui/styled-link'

import { DeskItem } from './desk-item'

export const DeskList = ({ title, desks }) => {
  const dispatch = useDispatch()

  const handleClick = id => {
    // console.log('clicked')
    // addDesk({ name: 'Test', id: Math.floor(Math.random() * 500) })
    dispatch(getDesk(id))
    // .then(selectDesk(id))
  }

  let deskList = desks
    ? desks.map(desk => (
        <DeskItem
          name={desk.name}
          key={desk.id}
          id={desk.id}
          onClick={() => handleClick(desk.id)}
        />
      ))
    : null

  return (
    <div>
      <h3>{title}</h3>
      <List>
        {deskList}
        {/* <DeskItem name="Создать доску" key="add" to="/desks/create" /> */}
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
