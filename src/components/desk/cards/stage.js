import React from 'react'
import { styled } from 'linaria/react'

import { stages } from '@lib/constants'

export const Stage = ({ id }) => {
  let { color, name } = stages.filter(stage => stage.id === id)[0]
  return (
    <div>
      <Title>СТАДИЯ</Title>
      <Text color={color}>{name}</Text>
    </div>
  )
}

const Title = styled.h3`
  color: var(--secondary-text);
  font-size: 12px;
`

const Text = styled.p`
  padding: 4px;
  background-color: ${props => props.color};
  margin: 0;
  width: fit-content;
  border-radius: 3px;
  color: white;
`
