import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout as logoutAction } from '@symbiotes/helpers'
import { Dropdown } from '@ui'

import user from '@assets/user.svg'
import { StyledLink } from '@ui/'

export const Header = () => {
  const hidden = useSelector(state => state.auth.hidden)
  const dispatch = useDispatch()

  const logout = () => dispatch(logoutAction())

  return (
    <StyledHeader hidden={hidden}>
      <NavBar>
        <Link className={styledLink} to="/">
          Главная
        </Link>
        {/* <Link className={styledLink} to="/mindmap">
          MindMap
        </Link> */}
      </NavBar>
      <Title>
        <Link className={styledLink} to="/">
          Project manager
        </Link>
      </Title>
      <Dropdown
        width={100}
        content={
          <Item>
            <StyledLink to="/auth" onClick={logout}>
              Выход
            </StyledLink>
          </Item>
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

const Item = styled.p`
  padding: 0 0.3em;
  text-align: center;
  box-sizing: border-box;
`
