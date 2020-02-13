import React from 'react'
import { styled } from 'linaria/react'

import { getProgress } from '@lib/get-progress'

export const Progress = ({ lists, type }) => {
  let { progress } = getProgress(lists, type)
  return (
    <>
      {!(type === 'singlelist') && <Title>ВЫПОЛНЕНИЕ</Title>}
      <Percent>
        {Math.floor(progress)}%
        <ProgressBar max="100" value={progress} />
      </Percent>
    </>
  )
}

const Title = styled.h3`
  color: var(--secondary-text);
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
    background-color: var(--secondary);
  }

  &::-webkit-progress-value {
    border-radius: 4px;
    background-color: var(--primary);
  }
`

const Percent = styled.p`
  color: var(--secondary-text);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
