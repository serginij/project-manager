import React from 'react'
import { styled } from 'linaria/react'
import { Icon } from './icon'

import close from '@assets/close.png'

export const CloseButton = ({ children, ...props }) => (
  <Button {...props}>
    {children ? children : <Icon src={close} alt="close" />}
  </Button>
)

const Button = styled.button`
  cursor: pointer;
  border: none;
  padding: 0;
  margin: 0;
  height: fit-content;
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
