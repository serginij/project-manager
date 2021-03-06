import { styled } from 'linaria/react'

export const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: ${props => (props.autoHeight ? 'auto' : '4rem')};
  border-radius: 3px;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  background-color: #ffffff;
  border: none;
  margin: -4px 0 8px 0;
  padding: 8px 0 8px 12px;
  line-height: 20px;
  resize: none;
  font: inherit;
`
