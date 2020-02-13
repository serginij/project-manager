import React from 'react'
import { styled } from 'linaria/react'

export const CheckIcon = ({ checked, size = 16, thickness = 2 }) => {
  return (
    <Icon
      viewBox="0 0 24 24"
      checked={checked}
      size={size}
      strokeWidth={thickness + 'px'}
    >
      <polyline points="20 6 9 17 4 12" />
    </Icon>
  )
}

const Icon = styled.svg`
  fill: none;
  stroke: white;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  visibility: ${props => (props.checked ? 'visible' : 'hidden')};
`
