import React from 'react'
import { styled } from 'linaria/react'

import { CloseButton } from './close-button'

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
  background: #dfe3e6;
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
const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  height: 2.5rem;
  border-radius: 3px;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  background: #fff;
  border: none;
  margin-bottom: 8px;
  padding: 8px 0 8px 12px;
  font: inherit;
`

const AddButton = styled.button`
  /* width: 50%; */
  height: 2rem;
  background: #39c071;
  border-radius: 3px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  font: inherit;
`

const OpenForm = styled.button`
  display: flex;
  flex-shrink: 0;
  border: none;
  align-items: center;
  background: #dfe3e6;
  border-radius: 3px;
  max-width: 300px;
  width: 100%;
  box-sizing: border-box;
  height: 2.5rem;
  padding: 8px;
  padding-left: 35px;
  color: #6b808c;
  position: relative;
  cursor: pointer;
  font: inherit;
  &::before {
    content: '+';
    left: 12px;
    /* top: 8px; */
    font-size: 2em;
    font-weight: 300;
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

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  height: 4rem;
  border-radius: 3px;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  background: #fff;
  border: none;
  margin: -4px 0 8px 0;
  padding: 8px 0 8px 12px;
  resize: none;
  font: inherit;
`
