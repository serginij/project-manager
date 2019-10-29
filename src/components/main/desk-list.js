import React from 'react'
import { styled } from 'linaria/react'
import { useDispatch } from 'react-redux'

import { desksActions } from '@symbiotes/desks'

import { DeskItem } from './desk-item'

export const DeskList = ({ title, desks }) => {
  const dispatch = useDispatch()

  const addDesk = desk => dispatch(desksActions.addDesk(desk))
  const selectDesk = id => dispatch(desksActions.setCurrentDesk(id))

  const handleClick = () => {
    console.log('clicked')
    addDesk({ name: 'Test', id: Math.floor(Math.random() * 500) })
  }

  let deskList = desks
    ? desks.map(desk => (
        <DeskItem
          name={desk.name}
          key={desk.id}
          id={desk.id}
          onClick={() => selectDesk(desk.id)}
        />
      ))
    : null

  return (
    <div>
      <h3>{title}</h3>
      <List>
        {deskList}
        <DeskItem name="Создать доску" key="add" onClick={handleClick} />
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
