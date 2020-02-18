import React from 'react'
import { css } from 'linaria'
import { Link } from 'react-router-dom'

export const StyledLink = ({ children, to, className }) => (
  <Link className={linkTo + ' ' + className} to={to}>
    {children}
  </Link>
)

const linkTo = css`
  display: block;
  color: black;
  width: 100%;
  height: 100%;
  text-decoration: none;
`
