import React from 'react'
import { styled } from 'linaria/react'
import { css } from 'linaria'
import { Link } from 'react-router-dom'

import user from '../../assets/user.svg'

export const Header = () => {
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
      <Avatar src={user} alt="avatar" onClick={handleClick} />
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
  padding: 10px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: darkslateblue;
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
  min-width: 10%;
`

const styledLink = css`
  color: white;
  text-decoration: none;
`
