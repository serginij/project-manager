import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'

import { Button } from '@ui'

export const UserList = ({ users, deleteUser, updateUser, showRole }) => {
  let list = users.map(user => (
    <UserItem key={user.id}>
      <h4>{user.username}</h4>
      <div>
        {showRole && (
          <Button className={button}>
            {user.is_admin ? 'Администратор' : 'Обычный'}
          </Button>
        )}
        {updateUser && (
          <Button
            onClick={() => updateUser(user.id, user.is_admin)}
            type="button"
          >
            {user.is_admin ? 'Администратор' : 'Обычный'}
          </Button>
        )}
        {deleteUser && (
          <Button
            className={delButton}
            onClick={() => deleteUser(user.id)}
            type="button"
          >
            Исключить
          </Button>
        )}
      </div>
    </UserItem>
  ))

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

const button = css`
  cursor: initial;
`

const delButton = css`
  background-color: var(--red);
  color: white;
  &:hover {
    background-color: var(--red);
  }
`
