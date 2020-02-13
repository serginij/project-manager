import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { useSelector, useDispatch } from 'react-redux'

import { Dropdown, CloseButton, Button } from '@ui'

import { deleteCardUser } from '@symbiotes/effects/'

export const UserInfo = ({ children, src, username, id }) => {
  const card = useSelector(state => state.cards.cards[state.cards.currentCard])
  const { token } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const handleDeleteUser = () => dispatch(deleteCardUser(card.id, id, token))

  return (
    <Dropdown
      width={300}
      content={
        <Content>
          <Header>
            <>
              <Avatar src={src} alt="avatar" />
              <Title>@{username}</Title>
            </>
            <CloseButton className={closeButton} />
          </Header>
          <Button className={buttonStyle} onClick={handleDeleteUser}>
            Удалить с карточки
          </Button>
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
  border-bottom: 1px solid var(--secondary);
`

const Title = styled.p`
  color: var(--secondary-text);
  font-size: 14px;
  text-align: center;
  width: 100%;
`

const Avatar = styled.img`
  width: 50px;
  height: 50px;
`

const closeButton = css`
  font-size: 24px;
  font-weight: 200;
`

const buttonStyle = css`
  width: 100%;
`
