import { styled } from 'linaria/react'

export const Icon = styled.img`
  width: ${props => (props.width ? props.width + 'px' : '24px')};
  height: ${props => (props.height ? props.height + 'px' : '24px')};
  opacity: ${props => (props.opacity ? props.opacity : '0.7')};
`
