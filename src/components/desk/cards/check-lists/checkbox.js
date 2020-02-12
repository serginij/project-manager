import React from 'react'
import { styled } from 'linaria/react'

export const Checkbox = ({ className, checked, onClick, ...props }) => (
  <CheckboxContainer className={className} onClick={onClick}>
    <HiddenCheckbox checked={checked} {...props} type="checkbox" />
    <StyledCheckbox checked={checked}>
      <Icon viewBox="0 0 24 24" checked={checked}>
        <polyline points="20 6 9 17 4 12" />
      </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
)

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  margin: 0 20px 0 8px;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
  visibility: ${props => (props.checked ? 'visible' : 'hidden')};
`

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 2px;

  &:focus {
    ${StyledCheckbox} {
      box-shadow: 0 0 0 3px var(--secondary__dark);
    }
  }
`
const StyledCheckbox = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${props =>
    props.checked ? 'var(--primary)' : 'var(--secondary__light)'};
  border-radius: 3px;
  border: 2px solid
    ${props => (props.checked ? 'var(--primary)' : 'var(--secondary)')};
  cursor: pointer;

  &:hover {
    background-color: ${props =>
      props.checked ? 'var(--primary)' : 'var(--secondary)'};
  }
`
