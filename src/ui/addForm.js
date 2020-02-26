import React from 'react'
import { styled } from 'linaria/react'

import { CloseButton } from './close-button'
import { AddButton } from './add-button'
import { Input } from './input'
import { TextArea } from './text-area'
import { Icon } from './icon'

import plus from '@assets/plus.png'

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
    setOpen(false)
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
    <OpenForm onClick={handleOpenForm}>
      <Icon src={plus} alt="" width={22} height={22} opacity={0.8} />
      {inputText}
    </OpenForm>
  ) : (
    <Wrapper onSubmit={handleAdd}>
      {input}
      <CloseForm>
        <AddButton type="submit">{buttonText}</AddButton>
        <CloseButton onClick={handleOpenForm} />
      </CloseForm>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  background: var(--secondary);
  max-width: 300px;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  padding: 12px;
  input::placeholder {
    padding-top: 0;
  }
  border-radius: 3px;
`

const OpenForm = styled.button`
  display: flex;
  flex-shrink: 0;
  border: none;
  align-items: center;
  background: var(--secondary);
  border-radius: 3px;
  max-width: 300px;
  width: 100%;
  box-sizing: border-box;
  height: 2.5rem;
  padding-left: 10px;

  color: var(--secondary-text);
  cursor: pointer;
  font-size: 15px;

  img {
    margin-right: 10px;
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
