import React from 'react'
import { styled } from 'linaria/react'

import { AddUser } from './add-user'
import { UserInfo } from './user-info'

import icon from '@assets/icon.png'

export const UsersList = ({ users }) => {
  let list = users.map(user => (
    <Item key={user.id}>
      <UserInfo username={user.username} id={user.id} src={icon}>
        <Avatar src={icon} alt="avatar" />
      </UserInfo>
    </Item>
  ))

  return (
    users.length > 0 && (
      <div>
        <Title>УЧАСТНИКИ</Title>
        <List>
          {list}
          <Item>
            <AddUser>
              <Add>+</Add>
            </AddUser>
          </Item>
        </List>
      </div>
    )
  )
}

const List = styled.ul`
  text-decoration: none;
  list-style: none;
  padding: 0;
  display: flex;
`

const Item = styled.li`
  text-decoration: none;
  list-style: none;
  margin-right: 8px;
`

const Add = styled.button`
  font-weight: 200;
  -webkit-text-decoration: none;
  text-decoration: none;
  font-size: 28px;
  border-radius: 50%;
  background-color: var(--dark-gray);
  border: none;
  color: var(--gray-text);
  cursor: pointer;
  box-sizing: border-box;
  padding: 0;
  width: 38px;
  height: 38px;
  text-align: center;
  padding-bottom: 10px;

  &:hover {
    background-color: var(--gray-selection);
  }
`

const Title = styled.h3`
  color: var(--gray-text);
  font-size: 12px;
`

const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  cursor: pointer;
`
