import React, { useState, useRef, useEffect } from 'react'
import { styled } from 'linaria/react'

export const ToggleInput = ({
  onSubmit = text => text,
  text,
  children = null,
  inputStyle
}) => {
  let [edit, setEdit] = useState(false)
  let [value, setValue] = useState(text)

  const inputRef = useRef(null)

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleOpenForm = () => {
    setEdit(true)
  }

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(value)
    setEdit(false)
  }

  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [edit])

  return (
    <>
      {edit ? (
        <form onSubmit={handleSubmit} style={{ width: '85%' }}>
          <Input
            className={inputStyle}
            ref={inputRef}
            type="text"
            value={value}
            onChange={handleChange}
            onBlur={handleSubmit}
          />
        </form>
      ) : children ? (
        children
      ) : (
        <Name onClick={handleOpenForm}>{text}</Name>
      )}
    </>
  )
}

const Input = styled.input`
  font-size: 1rem;
  width: 100%;
  padding: 0;
  padding-left: 8px;
  margin: 12px 0;
  width: 100%;
`

const Name = styled.h4`
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  margin: 12px 0 13px 8px;
  cursor: pointer;
  &:last-child {
    padding-bottom: 0;
  }
`
