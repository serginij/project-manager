import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from 'linaria/react'

import { Button } from '@ui'

import { deleteTeamUser, updateTeamUser } from '@symbiotes/effects'

export const UserList = ({ users, token }) => {
  let list = users.map(user => (
    <UserItem key={user.id}>
      <h4>{user.username}</h4>
      <div>
        <Button onClick={() => handleUpdateUser(user.id, user.is_admin)}>
          {user.is_admin ? 'Администратор' : 'Обычный'}
        </Button>
        <Button onClick={() => handleDeleteUser(user.id)}>Исключить</Button>
      </div>
    </UserItem>
  ))
  const { currentTeam } = useSelector(state => state.teams)

  const dispatch = useDispatch()

  const handleDeleteUser = userId => {
    dispatch(deleteTeamUser(userId, currentTeam, token))
  }

  const handleUpdateUser = (userId, isAdmin) => {
    dispatch(updateTeamUser(userId, currentTeam, !isAdmin))
  }

  return <section>{list}</section>
}

const UserItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(9, 30, 66, 0.13);
  min-height: 40px;
  width: 100%;
`