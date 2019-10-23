import React from 'react'
import { styled } from 'linaria/react'
import { Link } from 'react-router-dom'

import user from '../../assets/user.svg'

import { request } from '@lib/request'

export const Header = () => {
  const handleClick = () => {
    request('http://localhost:3000/users').then(res => console.log(res))
  }

  return (
    <StyledHeader>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/mindmap">MindMap</StyledLink>
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

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`
