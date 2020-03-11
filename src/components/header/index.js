import React, { useEffect } from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout as logoutAction } from '@symbiotes/helpers'
import { Dropdown, StyledLink } from '@ui'
import { history } from '@lib/routing'

import user from '@assets/user.svg'

export const Header = () => {
  const hidden = useSelector(state => state.auth.hidden)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutAction())
    history.replace('/auth')
  }

  const goBack = () => {
    if (history.location.pathname !== '/') {
      history.goBack()
    }
  }
  console.log(history.location.pathname)

  useEffect(() => {
    console.log('abc')
  }, [])

  return (
    <StyledHeader hidden={hidden}>
      <NavBar>
        <Text
          // hidden={history.location.pathname === '/'}
          className={styledLink}
          onClick={goBack}
        >
          Назад
        </Text>
      </NavBar>
      <Title>
        <Link className={styledLink} to="/">
          Project manager
        </Link>
      </Title>
      <Dropdown
        width={100}
        content={
          <>
            <Item onClick={logout}>Выход</Item>
            <StyledLink to="/edit-profile">
              <Item>Профиль</Item>
            </StyledLink>
          </>
        }
        align
        close
      >
        <Avatar src={user} alt="avatar" />
      </Dropdown>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  position: absolute;
  left: 0;
  top: 0;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary);

  @media (max-width: 700px) {
    padding: 10px 20px;
  }
`

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`

const NavBar = styled.nav`
  display: flex;
  justify-content: space-evenly;
`

const styledLink = css`
  color: white;
  text-decoration: none;
`

const Title = styled.h2`
  color: white;

  @media (max-width: 700px) {
    font-size: 1em;
  }
`

const Text = styled.p`
  color: white;
  cursor: pointer;
`

const Item = styled.p`
  /* padding: 0 0.3em; */
  margin: 1em 0;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;

  &:last-child {
    margin-top: 0;
    padding-top: 1em;
    border-top: 1px solid var(--secondary);
  }
`
