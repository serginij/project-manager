import React from 'react'
import { styled } from 'linaria/react'

import { getProgress } from '@lib/get-progress'
import { Progress as ProgressBar } from '@ui'

export const Progress = ({ lists, type }) => {
  let { progress } = getProgress(lists, type)
  return (
    <>
      {!(type === 'singlelist') && <Title>ВЫПОЛНЕНИЕ</Title>}
      <ProgressBar progress={progress} />
    </>
  )
}

const Title = styled.h3`
  color: var(--secondary-text);
  font-size: 12px;
`
