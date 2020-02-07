import React from 'react'
import { styled } from 'linaria/react'

export const Progress = ({ lists }) => {
  let value = 0,
    total = 0
  lists.forEach(list => {
    list.items.forEach(item => {
      if (item.checked) {
        value++
      }
      total++
    })
  })
  let progress = (value / total) * 100
  return (
    <>
      <Title>ВЫПОЛНЕНИЕ</Title>
      <Percent>
        {Math.floor(progress)}%
        <ProgressBar max="100" value={progress} />
      </Percent>
    </>
  )
}

const Title = styled.h3`
  color: var(--gray-text);
  font-size: 12px;
`

const ProgressBar = styled.progress`
  -webkit-appearance: none;
  appearance: none;

  width: 90%;
  text-align: center;
  height: 8px;

  &::-webkit-progress-bar {
    border-radius: 4px;
    background-color: var(--dark-gray);
  }

  &::-webkit-progress-value {
    border-radius: 4px;
    background-color: var(--primary-color);
  }
`

const Percent = styled.p`
  color: var(--gray-text);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
