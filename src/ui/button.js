import { styled } from 'linaria/react'

export const Button = styled.button`
  padding: 6px 12px;
  background-color: var(--secondary);
  border-radius: 3px;
  margin-right: 8px;
  height: fit-content;
  border: none;
  color: black;
  font-size: 14px;
  cursor: pointer;
  min-width: 100px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--secondary__dark);
  }
`
