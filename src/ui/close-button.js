import React from 'react'
import { styled } from 'linaria/react'

export const CloseButton = ({ children, ...props }) => (
  <Button {...props}>{children ? children : '×'}</Button>
)

const Button = styled.button`
  font-size: 2em;
  font-weight: 300;
  cursor: pointer;
  border: none;
  padding: 0;
  background-color: rgba(0, 125, 215, 0);
  color: #6b808c;
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  &:hover {
    color: black;
  }

  &:focus {
    outline: none;
  }
`
