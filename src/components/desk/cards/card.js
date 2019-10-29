import React from 'react'
import { styled } from 'linaria/react'

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: #ffffff;
  min-height: 2.5rem;
  border: none;
  border-radius: 3px;
  margin-bottom: 8px;
  word-wrap: break-word;
  &:last-child {
    margin-bottom: 0;
  }
`

const Text = styled.p`
  padding: 8px 0 8px 12px;
`

export const Card = ({ text }) => (
  <Wrapper>
    <Text>{text}</Text>
  </Wrapper>
)
