import React from 'react'
import { styled } from 'linaria/react'
import { Link } from 'react-router-dom'

export const Header = () => (
  <StyledHeader>
    <Link to="/">Home</Link>
  </StyledHeader>
)

const StyledHeader = styled.header`
  height: 50px;
  flex-direction: row;
  justify-content: space-evenly;
`
