import { styled } from 'linaria/react'

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 2.5rem;
  border-radius: 3px;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  border: ${props => (props.error ? '1px solid var(--red)' : 'none')};
  background: #fff;
  margin-bottom: 8px;
  padding: 8px 0 8px 12px;
  font: inherit;
`
