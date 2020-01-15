import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { logout as logoutAction } from '@symbiotes/helpers'

import { Dropdown } from '@ui'

import user from '../../assets/user.svg'

export const Header = () => {
  const dispatch = useDispatch()

  const logout = () => dispatch(logoutAction())

  const handleClick = () => {
    console.log('clicked')
  }
  return (
    <StyledHeader>
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
        x={0}
        y={0}
        list={[{ text: 'Выход', link: '/auth', action: logout }]}
        align
      >
        <Avatar src={user} alt="avatar" onClick={handleClick} />
      </Dropdown>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
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
  background-color: #483d8b;
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
`
