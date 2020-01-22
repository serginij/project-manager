import React, { useEffect, useCallback } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { Dropdown, Input, CloseButton } from '@ui'

import { addCardUser, findDeskUser } from '@symbiotes/effects'

export const AddUser = ({ children }) => {
  const card = useSelector(state => state.cards.cards[state.cards.currentCard])
  const desk = useSelector(state => state.desks.desks[state.desks.currentDesk])
  const { foundList } = useSelector(state => state.desks)
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleAddUser = id => dispatch(addCardUser(card.id, id, token))

  const handleChange = e => {
    searchUser(e.target.value)
  }

  const searchUser = useCallback(
    username => {
      dispatch(findDeskUser(desk.id, username, token))
    },
    [desk.id, dispatch, token]
  )

  let list =
    desk &&
    foundList.map(user => {
      return (
        <UserItem onClick={() => handleAddUser(user.id)} key={user.id}>
          @{user.username}
        </UserItem>
      )
    })

  useEffect(() => {
    searchUser('')
  }, [searchUser])

  return (
    <Dropdown
      width={300}
      content={
        <Content>
          <Header>
            <Title>Участники</Title>
            <CloseButton className={closeButton} />
          </Header>
          <Input
            className={styledInput}
            placeholder="Поиск людей"
            onChange={handleChange}
          />
          <UserList>{list}</UserList>
        </Content>
      }
    >
      {children}
    </Dropdown>
  )
}

const Content = styled.div`
  padding: 12px;
  padding-top: 0px;
  box-sizing: border-box;
`

const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--dark-gray);
`

const Title = styled.p`
  color: var(--gray-text);
  font-size: 14px;
  text-align: center;
  width: 100%;
`

const closeButton = css`
  font-size: 24px;
  font-weight: 200;
`

const styledInput = css`
  font-size: 14px;
`

const UserList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`

const UserItem = styled.li`
  list-style: none;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 12px;
  margin-top: 8px;
  border-radius: 3px;
  font-size: 14px;
  &:hover {
    background-color: var(--dark-gray);
    cursor: pointer;
  }

  &:nth-child(1) {
    margin: 0;
  }
`
