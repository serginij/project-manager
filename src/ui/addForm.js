import React from 'react'
import { styled } from 'linaria/react'

import { CloseButton } from './close-button'
import { AddButton } from './add-button'
import { Input } from './input'
import { TextArea } from './text-area'

export const AddForm = ({
  onAdd,
  placeholder,
  buttonText,
  inputText,
  type
}) => {
  const [name, setName] = React.useState('')
  const [opened, setOpen] = React.useState(false)

  const handleAdd = e => {
    e.preventDefault()
    if (name.trim()) {
      onAdd(name)
    }
    setName('')
  }
  const handleChange = e => setName(e.target.value)
  const handleOpenForm = () => {
    setOpen(o => !o)
  }

  const isColumn = type === 'column'

  const input = isColumn ? (
    <Input
      value={name}
      type="text"
      placeholder={placeholder}
      onChange={handleChange}
      column={isColumn}
    />
  ) : (
    <TextArea
      value={name}
      placeholder={placeholder}
      onChange={handleChange}
      column={isColumn}
    />
  )

  return !opened ? (
    <OpenForm onClick={handleOpenForm}>{inputText}</OpenForm>
  ) : (
    <Wrapper onSubmit={handleAdd}>
      {input}
      <CloseForm>
        <AddButton type="submit">{buttonText}</AddButton>
        <CloseButton onClick={handleOpenForm}>×</CloseButton>
      </CloseForm>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  background: var(--dark-gray);
  max-width: 300px;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 12px;
  input::placeholder {
    color: #b8b9bb;
    padding-top: 0;
  }
  textarea::placeholder {
    color: #b8b9bb;
  }
  border-radius: 3px;
`

const OpenForm = styled.button`
  display: flex;
  flex-shrink: 0;
  border: none;
  align-items: center;
  background: var(--dark-gray);
  border-radius: 3px;
  max-width: 300px;
  width: 100%;
  box-sizing: border-box;
  height: 2.5rem;
  padding: 0;
  padding-left: 40px;
  color: #6b808c;
  position: relative;
  cursor: pointer;
  font: inherit;
  font-size: 15px;
  &::before {
    content: '+';
    left: 12px;
    /* top: 8px; */
    font-size: 2em;
    font-weight: 300;
    height: 100%;
    position: absolute;
  }
`

const CloseForm = styled.div`
  width: 100%;
  display: flex;
  padding: 0;
  justify-content: space-between;
  cursor: default;
  height: 2rem;
`
