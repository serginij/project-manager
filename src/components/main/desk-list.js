import React from 'react'
import { styled } from 'linaria/react'

import { DeskItem } from './desk-item'

export const DeskList = ({ title, desks }) => {
  let deskList = desks
    ? desks.map((desk, index) => <DeskItem key={index} name={desk.name} />)
    : null

  return (
    <div>
      <h3>{title}</h3>
      <List>
        {deskList}
        <DeskItem name="Создать доску" key="add" />
      </List>
    </div>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  /* width: 70%; */
  padding: 0;
`
