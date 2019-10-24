import React from 'react'
import { styled } from 'linaria/react'
import { Link } from 'react-router-dom'

export const StyledLink = ({ children, to }) => (
  <LinkTo to={to}>{children}</LinkTo>
)

const LinkTo = styled(Link)`
  color: black;
  width: 100%;
  height: 100%;
  text-decoration: none;
`
