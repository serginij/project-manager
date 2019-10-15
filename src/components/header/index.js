import React from 'react'
import { styled } from 'linaria/react'
import { Link } from 'react-router-dom'

import user from '../../assets/user.svg'

export const Header = () => (
  <StyledHeader>
    <Link to="/">Home</Link>
    <Avatar src={user} alt="avatar" />
  </StyledHeader>
)

const StyledHeader = styled.header`
  display: flex;
  height: 50px;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
`

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`
