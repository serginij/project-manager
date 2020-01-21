import React from 'react'
import { styled } from 'linaria/react'
import { useSelector } from 'react-redux'

import { AddUser } from './add-user'

export const FeatBlock = () => {
  let isAdmin = useSelector(
    state => state.teams.teams[state.teams.currentTeam].isAdmin
  )

  return (
    <>
      <h4>Информация</h4>
      <List>
        {isAdmin && (
          <AddUser>
            <Item>Участники</Item>
          </AddUser>
        )}
        <Item>Метки</Item>
        <Item>Список</Item>
      </List>
    </>
  )
}

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`

const Item = styled.li`
  list-style: none;
  width: 100%;
  box-sizing: border-box;
  background-color: var(--dark-gray);
  padding: 12px 12px;
  margin-top: 8px;
  border-radius: 3px;
  font-size: 14px;
  &:hover {
    background-color: var(--gray-selection);
    cursor: pointer;
  }

  &:nth-child(1) {
    margin: 0;
  }
`
