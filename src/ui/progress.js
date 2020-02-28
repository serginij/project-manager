import React from 'react'
import { styled } from 'linaria/react'

export const Progress = ({ className, progress = 0, color }) => (
  <Percent>
    {Math.floor(progress)}%
    <ProgressBar
      max="100"
      value={progress}
      className={className}
      color={color}
    />
  </Percent>
)

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
    background-color: ${props =>
      props.color ? props.color : 'var(--primary)'};
  }
`

const Percent = styled.p`
  color: var(--secondary-text);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
