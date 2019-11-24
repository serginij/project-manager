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
      <Link className={styledLink} to="/">
        Home
      </Link>
      <Link className={styledLink} to="/mindmap">
        MindMap
      </Link>
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
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: darkslateblue;
`

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`

const styledLink = css`
  color: white;
  text-decoration: none;
`
