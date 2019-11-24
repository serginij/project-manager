import React from 'react'
import { css } from 'linaria'
import { Link } from 'react-router-dom'

export const StyledLink = ({ children, to }) => (
  <Link className={linkTo} to={to}>
    {children}
  </Link>
)

const linkTo = css`
  color: black;
  width: 100%;
  height: 100%;
  text-decoration: none;
`
